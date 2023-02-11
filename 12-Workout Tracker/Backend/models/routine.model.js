const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const routineSchema = new Schema({
  routinename: { type: String, required: true },
  routinedetail: { type: Array, required: true },
  routinetype: { type: String, required: true, trim: true }
}, {
  timestamps: true,
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;