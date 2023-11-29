const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

// Auth routes
// POST /api/signup
router.post('/signup', signup);
// POST /api/signin
router.post('/signin', signin);
// GET /api/logout
router.get('/logout', logout);
// GET /api/me
router.get('/me', isAuthenticated, userProfile);

module.exports = router;
