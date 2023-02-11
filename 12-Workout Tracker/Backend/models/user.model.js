const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  unit: { type: String, required: true },
  activity: { type: String, required: true },
  bmi: { type: Number, required: true },
  bmiCategory: { type: String, required: true },
  bmr: { type: Number, required: true },
  dailycalories: { type: Number, required: true }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;