const router = require('express').Router();
let Routine = require('../models/routine.model');

// Get All Routines
router.route('/').get((req, res) => {
    Routine.find()
    .then(routines => res.json(routines))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add Routine
router.route('/add').post((req, res) => {
  const routinename = req.body.routinename;
  const routinedetail = req.body.routinedetail;
  const routinetype = req.body.routinetype;

  const newRoutine = new Routine({
    routinename,
    routinedetail,
    routinetype
  });

  newRoutine.save()
  .then(() => res.json('Routine added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Get Routine
router.route('/:id').get((req, res) => {
  Routine.findById(req.params.id)
    .then(routine => res.json(routine))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Routine
router.route('/:id').delete((req, res) => {
  Routine.findByIdAndDelete(req.params.id)
    .then(() => res.json('Routine deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Routine
router.route('/update/:id').post((req, res) => {
  Routine.findById(req.params.id)
    .then(routine => {
      routine.routinename = req.body.routinename;
      routine.routinedetail = req.body.routinedetail;
      routine.routinetype = req.body.routinetype;

      routine.save()
        .then(() => res.json('Routine updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;