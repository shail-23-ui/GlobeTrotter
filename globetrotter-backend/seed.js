require('dotenv').config();
const mongoose = require('mongoose');
const City = require('./models/City');
const Activity = require('./models/Activity');

const cities = [
  { name: 'Paris', country: 'France', region: 'Europe', costIndex: 4, popularity: 5 },
  { name: 'Rome', country: 'Italy', region: 'Europe', costIndex: 3, popularity: 5 },
  { name: 'Barcelona', country: 'Spain', region: 'Europe', costIndex: 3, popularity: 5 },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Europe', costIndex: 4, popularity: 4 },
  { name: 'Bangkok', country: 'Thailand', region: 'Asia', costIndex: 2, popularity: 4 },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', costIndex: 2, popularity: 5 },
  { name: 'Tokyo', country: 'Japan', region: 'Asia', costIndex: 4, popularity: 5 },
  { name: 'Singapore', country: 'Singapore', region: 'Asia', costIndex: 5, popularity: 4 },
  { name: 'New York', country: 'USA', region: 'North America', costIndex: 5, popularity: 5 },
  { name: 'Mexico City', country: 'Mexico', region: 'North America', costIndex: 2, popularity: 4 },
  { name: 'Cape Town', country: 'South Africa', region: 'Africa', costIndex: 2, popularity: 4 },
  { name: 'Marrakech', country: 'Morocco', region: 'Africa', costIndex: 2, popularity: 3 },
  { name: 'Sydney', country: 'Australia', region: 'Oceania', costIndex: 5, popularity: 4 },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'South America', costIndex: 3, popularity: 4 },
  { name: 'Lisbon', country: 'Portugal', region: 'Europe', costIndex: 3, popularity: 4 },
];

const activityTemplates = [
  { name: 'City Walking Tour', category: 'sightseeing', cost: 20, durationHours: 3 },
  { name: 'Local Food Tour', category: 'food', cost: 45, durationHours: 2.5 },
  { name: 'Museum Visit', category: 'culture', cost: 15, durationHours: 2 },
  { name: 'Adventure Day Trip', category: 'adventure', cost: 80, durationHours: 6 },
  { name: 'Spa & Relax Day', category: 'relax', cost: 60, durationHours: 3 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data so re-running this script doesn't create duplicates
    await City.deleteMany({});
    await Activity.deleteMany({});
    console.log('Cleared old cities and activities');

    for (const cityData of cities) {
      const city = await City.create(cityData);

      const activitiesForCity = activityTemplates.map((template) => ({
        ...template,
        cityId: city._id,
        description: `${template.name} in ${city.name}`,
      }));

      await Activity.insertMany(activitiesForCity);
      console.log(`Seeded ${city.name} with ${activitiesForCity.length} activities`);
    }

    console.log('Seed complete!');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
