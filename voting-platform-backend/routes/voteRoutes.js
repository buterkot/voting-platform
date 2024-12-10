const express = require('express');
const { createVoteController } = require('../controllers/voteController');

const router = express.Router();

router.post('/add', createVoteController);

module.exports = router;
