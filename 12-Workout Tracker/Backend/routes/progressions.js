const router = require('express').Router();
let Progression = require('../models/progression.model');

// Get All Progressions
router.route('/').get((req, res) => {
    Progression.find()
    .then(progressions => res.json(progressions))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add Progression
router.route('/add').post((req, res) => {
  const progname = req.body.progname;
  const category = req.body.category;
  const discription = req.body.discription;
  const exercises = req.body.exercises;

  const newProgression = new Progression({
    progname,
    category,
    discription,
    exercises
  });

  newProgression.save()
  .then((response) => res.json({'data': 'Progression added!', 'id': response._id}))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Get Progression
router.route('/:id').get((req, res) => {
    Progression.findById(req.params.id)
    .then(progression => res.json(progression))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Progression
router.route('/:id').delete((req, res) => {
    Progression.findByIdAndDelete(req.params.id)
    .then(() => res.json('Progression deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Progression
router.route('/update/:id').post((req, res) => {
    Progression.findById(req.params.id)
    .then(progression => {
      progression.progname = req.body.progname;
      progression.category = req.body.category;
      progression.discription = req.body.discription;
      progression.exercises = req.body.exercises;

      progression.save()
      .then((response) => res.json({'data': 'Progression Updated!', 'id': response._id}))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;