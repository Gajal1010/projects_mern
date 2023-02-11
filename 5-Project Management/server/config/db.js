const mongoose = require('mongoose');

const connectDB = async () => {
	const conn = await mongoose.connect('mongodb://localhost:27017');

	console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
