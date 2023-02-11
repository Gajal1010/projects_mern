const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutlogSchema = new Schema({
  workoutdate: { type: Date, required: true },
  routinename: { type: String, required: true, trim: true },
  duration: { type: Number, required: true },
  username: { type: String, required: true, trim: true }
}, {
  timestamps: true,
});

const Workoutlog = mongoose.model('Workoutlog', workoutlogSchema);

module.exports = Workoutlog;