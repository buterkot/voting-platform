const express = require('express');
const { fileComplaint, getComplaints, changeComplaintStatus } = require('../controllers/complaintController');

const router = express.Router();

router.post('/', fileComplaint);  
router.get('/', getComplaints);   
router.patch('/:id', changeComplaintStatus); 

module.exports = router;
