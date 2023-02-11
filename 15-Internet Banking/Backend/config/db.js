const mongoose = require("mongoose");

const connectToMongoose = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sprints', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Mongoose Through ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectToMongoose,
};
