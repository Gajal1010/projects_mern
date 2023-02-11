const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const progressionSchema = new Schema({
  progname: { type: String, required: true },
  category: { type: String, required: true, trim: true },
  discription: { type: String, trim: true },
  exercises: { type: Array, trim: true },
}, {
  timestamps: true,
});

const Progression = mongoose.model('Progression', progressionSchema);

module.exports = Progression;