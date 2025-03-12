const express = require('express');
const {
    getUsers,
    updateUserBanStatus,
    updateUserRoleStatus
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.patch('/:id', updateUserBanStatus);
router.patch('/:id/role', updateUserRoleStatus);

module.exports = router;
