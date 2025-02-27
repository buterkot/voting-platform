const express = require('express');
const { 
    addComment, 
    getCommentsByVoteId, 
} = require('../controllers/commentController');

const router = express.Router();

router.post('/add', addComment);
router.get('/:voteId', getCommentsByVoteId);

module.exports = router;