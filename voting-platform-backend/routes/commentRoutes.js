const express = require('express');
const { 
    addComment, 
    deleteComment,
    getCommentsByVoteId, 
} = require('../controllers/commentController');

const router = express.Router();

router.post('/add', addComment);
router.get('/:voteId', getCommentsByVoteId);
router.delete('/delete/:commentId', deleteComment);

module.exports = router;