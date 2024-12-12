const express = require('express');
const {
    getUsers,
    updateUserBanStatus
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);

router.patch('/:id', updateUserBanStatus);

module.exports = router;
