const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  costIndex: { type: Number, required: true },
  popularity: { type: Number, required: true },
  imageUrl: String,
});

module.exports = mongoose.model('City', citySchema);
