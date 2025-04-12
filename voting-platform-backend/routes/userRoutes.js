const express = require('express');
const {
    getUsers,
    getUserById,
    updateUserBanStatus,
    updateUserRoleStatus,
    updateUserInfo,
    updateSettings
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/:id', updateUserBanStatus);
router.patch('/:id/role', updateUserRoleStatus);
router.post('/update', updateUserInfo);
router.post('/update-settings', updateSettings);

module.exports = router;
