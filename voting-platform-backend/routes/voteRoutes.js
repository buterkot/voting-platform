const express = require('express');
const { 
    createVoteController, 
    getVotesController, 
    getVoteByIdController,
    castVoteController, 
    castMultipleVotesController,
    stopVoteController,
    getUserVotesController,
    getVoteParticipantsController,
    removeVoteController,
    fetchAllTags
} = require('../controllers/voteController');

const router = express.Router();

router.post('/add', createVoteController);
router.get('/', getVotesController);
router.post('/vote', castVoteController);
router.post('/vote-multiple', castMultipleVotesController);
router.post('/stop', stopVoteController); 
router.get('/user/:userId', getUserVotesController);
router.get('/participants/:voteId', getVoteParticipantsController);
router.get('/:voteId', getVoteByIdController);
router.patch('/remove/:voteId', removeVoteController);
router.get('/tags/load', fetchAllTags);

module.exports = router;