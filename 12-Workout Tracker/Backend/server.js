const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/wt';

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');
const progressionsRouter = require('./routes/progressions');
const routinesRouter = require('./routes/routines');
const workoutlogsRouter = require('./routes/workoutlogs');


app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);
app.use('/progressions', progressionsRouter);
app.use('/routines', routinesRouter);
app.use('/workoutlogs', workoutlogsRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});