const express = require('express');
const {
    createGroup,
    getGroupById,
    getUserGroups,
    getGroupMembers,
    getGroupsCreatedByUser 
} = require('../controllers/groupController');

const router = express.Router();

router.post('/', createGroup);
router.get('/:id', getGroupById);
router.get('/user/:userId', getUserGroups);
router.get('/:id/members', getGroupMembers);
router.get('/creator/:creatorId', getGroupsCreatedByUser);

module.exports = router;
