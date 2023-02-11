const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
 const favoritesSchema = new Schema ({
  favoritedSign: String,
  favoritedDate: String,
  favoritedDescription: String,
 })

const profileSchema = new Schema({
  sign: String,
  favorites: [favoritesSchema],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema)