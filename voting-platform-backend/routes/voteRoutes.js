const express = require('express');
const { 
    createVoteController, 
    getVotesController, 
    getVoteByIdController,
    castVoteController, 
    stopVoteController,
    getUserVotesController,
    getVoteParticipantsController
} = require('../controllers/voteController');

const router = express.Router();

router.post('/add', createVoteController);
router.get('/', getVotesController);
router.post('/vote', castVoteController);
router.post('/stop', stopVoteController); 
router.get('/user/:userId', getUserVotesController);
router.get('/participants/:voteId', getVoteParticipantsController);
router.get('/:voteId', getVoteByIdController);

module.exports = router;
