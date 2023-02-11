const router = require('express').Router();
let Workoutlog = require('../models/workoutlog.model');

// Get All Workoutlogs
router.route('/').get((req, res) => {
  Workoutlog.find()
    .then(workoutlogs => res.json(workoutlogs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add Workoutlog
router.route('/add').post((req, res) => {
  const workoutdate = Date.parse(req.body.workoutdate);
  const routinename = req.body.routinename;
  const duration = Number(req.body.duration);
  const username = req.body.username;

  const newWorkoutlog = new Workoutlog({
    workoutdate,
    routinename,
    duration,
    username
  });

  newWorkoutlog.save()
  .then(() => res.json('Workout Log added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Get Workoutlog
router.route('/:id').get((req, res) => {
  Workoutlog.findById(req.params.id)
    .then(workoutlog => res.json(workoutlog))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Workoutlog
router.route('/:id').delete((req, res) => {
  Workoutlog.findByIdAndDelete(req.params.id)
    .then(() => res.json('Workout Log deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Workoutlog
router.route('/update/:id').post((req, res) => {
  Workoutlog.findById(req.params.id)
    .then(workoutlog => {
      workoutlog.workoutdate = Date.parse(req.body.workoutdate);
      workoutlog.routinename = req.body.routinename;
      workoutlog.duration = Number(req.body.duration);
      workoutlog.username = req.body.username;

      workoutlog.save()
        .then(() => res.json('Workout Log updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;