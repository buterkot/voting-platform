const express = require('express');
const { fileComplaint, getComplaints, changeComplaintStatus } = require('../controllers/complaintController');

const router = express.Router();

router.post('/comments', fileComplaint);  
router.get('/comments', getComplaints);   
router.patch('/comments/:id', changeComplaintStatus); 

module.exports = router;
