const express = require('express');
const {
    sendInvitation,
    getInvitationsForUser,
    respondToInvitation
} = require('../controllers/invitationController');

const router = express.Router();

router.post('/', sendInvitation);                
router.get('/:userId', getInvitationsForUser);    
router.patch('/respond', respondToInvitation);    

module.exports = router;
