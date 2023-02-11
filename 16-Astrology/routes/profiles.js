const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profiles');

router.post('/:id', profilesCtrl.create);
router.get('/:id', profilesCtrl.index)
router.delete('/:userId/:id', profilesCtrl.delete)

module.exports = router;