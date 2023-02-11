require('dotenv').config();
require('./config/database');

const Sign = require('./models/sign');

// Pattern:  IIFE
(async function() {

  await Sign.deleteMany({});
  const signs = await Sign.create([
    {sign: 'Capricorn', image: '♑︎'},
    {sign: 'Aquarius', image: '♒︎'},
    {sign: 'Pisces', image: '♓︎'},
    {sign: 'Aries', image: '♈︎'},
    {sign: 'Taurus', image: '♉︎'},
    {sign: 'Gemini', image: '♊︎'},
    {sign: 'Cancer', image: '♋︎'},
    {sign: 'Leo', image: '♌︎'},
    {sign: 'Virgo', image: '♍︎'},
    {sign: 'Libra', image: '♎︎'},
    {sign: 'Scorpio', image: '♏︎'},
    {sign: 'Sagittarius', image: '♐︎'},
  ]);

  console.log(signs)

  process.exit();

})();