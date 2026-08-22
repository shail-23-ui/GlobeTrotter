const express = require('express');
const Trip = require('../models/Trip');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// All trip routes require auth
router.use(requireAuth);

// CREATE TRIP
router.post('/', async (req, res) => {
  try {
    const { name, startDate, endDate, description } = req.body;

    if (!name || !startDate || !endDate) {
      return res.status(400).json({ error: 'Name, startDate, and endDate are required' });
    }
    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({ error: 'endDate must be after startDate' });
    }

    const trip = await Trip.create({
      userId: req.userId,
      name,
      startDate,
      endDate,
      description,
      stops: [],
    });

    res.status(201).json(trip);
  } catch (err) {
    console.error('Create trip error:', err);
    res.status(500).json({ error: 'Something went wrong creating the trip' });
  }
});

// LIST USER'S TRIPS
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    console.error('List trips error:', err);
    res.status(500).json({ error: 'Something went wrong fetching trips' });
  }
});

// GET ONE TRIP (with populated city/activity details)
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.userId })
      .populate('stops.cityId')
      .populate('stops.activities.activityId');

    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    console.error('Get trip error:', err);
    res.status(500).json({ error: 'Something went wrong fetching the trip' });
  }
});

// UPDATE TRIP
router.put('/:id', async (req, res) => {
  try {
    const { name, startDate, endDate, description } = req.body;

    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { name, startDate, endDate, description },
      { new: true }
    );

    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    console.error('Update trip error:', err);
    res.status(500).json({ error: 'Something went wrong updating the trip' });
  }
});

// DELETE TRIP
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    console.error('Delete trip error:', err);
    res.status(500).json({ error: 'Something went wrong deleting the trip' });
  }
});

// ADD A STOP TO A TRIP
router.post('/:id/stops', async (req, res) => {
  try {
    const { cityId, startDate, endDate } = req.body;
    if (!cityId || !startDate || !endDate) {
      return res.status(400).json({ error: 'cityId, startDate, and endDate are required' });
    }

    const trip = await Trip.findOne({ _id: req.params.id, userId: req.userId });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    const orderIndex = trip.stops.length;
    trip.stops.push({ cityId, startDate, endDate, orderIndex, activities: [] });
    await trip.save();

    res.status(201).json(trip);
  } catch (err) {
    console.error('Add stop error:', err);
    res.status(500).json({ error: 'Something went wrong adding the stop' });
  }
});

// DELETE A STOP
router.delete('/:tripId/stops/:stopId', async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, userId: req.userId });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    trip.stops = trip.stops.filter((s) => s._id.toString() !== req.params.stopId);
    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error('Delete stop error:', err);
    res.status(500).json({ error: 'Something went wrong deleting the stop' });
  }
});

// ADD AN ACTIVITY TO A STOP
router.post('/:tripId/stops/:stopId/activities', async (req, res) => {
  try {
    const { activityId, scheduledDate, notes } = req.body;
    if (!activityId) return res.status(400).json({ error: 'activityId is required' });

    const trip = await Trip.findOne({ _id: req.params.tripId, userId: req.userId });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    const stop = trip.stops.id(req.params.stopId);
    if (!stop) return res.status(404).json({ error: 'Stop not found' });

    stop.activities.push({ activityId, scheduledDate, notes });
    await trip.save();

    res.status(201).json(trip);
  } catch (err) {
    console.error('Add activity error:', err);
    res.status(500).json({ error: 'Something went wrong adding the activity' });
  }
});

// REMOVE AN ACTIVITY FROM A STOP
router.delete('/:tripId/stops/:stopId/activities/:activityEntryId', async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.tripId, userId: req.userId });
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    const stop = trip.stops.id(req.params.stopId);
    if (!stop) return res.status(404).json({ error: 'Stop not found' });

    stop.activities = stop.activities.filter(
      (a) => a._id.toString() !== req.params.activityEntryId
    );
    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error('Remove activity error:', err);
    res.status(500).json({ error: 'Something went wrong removing the activity' });
  }
});
// BUDGET BREAKDOWN
router.get('/:id/budget', async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.userId })
      .populate('stops.cityId')
      .populate('stops.activities.activityId');

    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    const byCategory = {};
    let activitiesTotal = 0;
    let stayTotal = 0;
    let transportTotal = 0;

    trip.stops.forEach((stop, index) => {
      // Activities cost, grouped by category
      stop.activities.forEach((entry) => {
        const activity = entry.activityId;
        if (!activity) return;
        byCategory[activity.category] = (byCategory[activity.category] || 0) + activity.cost;
        activitiesTotal += activity.cost;
      });

      // Rough stay estimate: nights * (city cost index * 40)
      const nights = Math.max(
        1,
        Math.round((new Date(stop.endDate) - new Date(stop.startDate)) / (1000 * 60 * 60 * 24))
      );
      const costIndex = stop.cityId?.costIndex || 3;
      stayTotal += nights * costIndex * 40;

      // Rough transport estimate: flat $150 per stop after the first
      if (index > 0) transportTotal += 150;
    });

    byCategory.stay = stayTotal;
    byCategory.transport = transportTotal;

    const total = activitiesTotal + stayTotal + transportTotal;
    const days = Math.max(
      1,
      Math.round((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24))
    );

    res.json({
      total,
      byCategory,
      averagePerDay: Math.round(total / days),
      days,
    });
  } catch (err) {
    console.error('Budget error:', err);
    res.status(500).json({ error: 'Something went wrong calculating the budget' });
  }
});

module.exports = router;
