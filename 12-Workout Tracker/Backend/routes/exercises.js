const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// Get All Exercises
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add Exercise
router.route('/add').post((req, res) => {
  const exercisename = req.body.exercisename;
  const type = req.body.type;
  const category = req.body.category;  
  const discription = req.body.discription;
  const progressionId = req.body.progressionId;
  const userId = req.body.userId;

  const newExercise = new Exercise({
    exercisename,
    type,
    category,
    discription,
    progressionId,
    userId
  });

  newExercise.save()
  .then(newExercise => res.json({'data': 'Exercise added!', 'id': newExercise._id}))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Get Exercise
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Exercise
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Exercise
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.exercisename = req.body.exercisename;
      exercise.type = req.body.type;
      exercise.category = req.body.category;
      exercise.discription = req.body.discription;
      exercise.progressionId = req.body.progressionId;
      exercise.userId = req.body.userId;

      exercise.save()
      .then(newExercise => res.json({'data': 'Exercise Updated!', 'id': newExercise._id}))
      .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;