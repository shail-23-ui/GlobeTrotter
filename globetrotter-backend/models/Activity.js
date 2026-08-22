const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }, // 'sightseeing' | 'food' | 'adventure' | 'culture' | 'relax'
  cost: { type: Number, required: true },
  durationHours: { type: Number, required: true },
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model('Activity', activitySchema);