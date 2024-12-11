const express = require('express');
const { 
    createVoteController, 
    getVotesController, 
    castVoteController, 
    stopVoteController,
    getUserVotesController
} = require('../controllers/voteController');

const router = express.Router();

router.post('/add', createVoteController);
router.get('/', getVotesController);
router.post('/vote', castVoteController);
router.post('/stop', stopVoteController); 
router.get('/user/:userId', getUserVotesController);

module.exports = router;
