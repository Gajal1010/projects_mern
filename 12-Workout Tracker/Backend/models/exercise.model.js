const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  exercisename: { type: String, required: true, unique: true, trim: true },
  type: { type: Array, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  discription: { type: String, trim: true },
  progressionId: { type: String, trim: true },
  userId: { type: String, trim: true }
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;