const express = require('express');
const { 
    addComment, 
    deleteComment,
    getCommentsByVoteId, 
    removeComment
} = require('../controllers/commentController');

const router = express.Router();

router.post('/add', addComment);
router.get('/:voteId', getCommentsByVoteId);
router.delete('/delete/:commentId', deleteComment);
router.patch('/remove/:commentId', removeComment);

module.exports = router;