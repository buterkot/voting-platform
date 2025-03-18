const express = require('express');
const { fileComplaint, getComplaints, changeComplaintStatus, voteComplaint } = require('../controllers/complaintController');

const router = express.Router();

router.post('/comments', fileComplaint);  
router.get('/comments', getComplaints);   
router.patch('/comments/:id', changeComplaintStatus); 

router.post('/votes', voteComplaint);

module.exports = router;
