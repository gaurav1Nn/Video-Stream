const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    register,
    login,
    refresh,
    logout,
    getMe,
} = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// Protected routes
router.post('/logout', auth, logout);
router.get('/me', auth, getMe);

module.exports = router;
