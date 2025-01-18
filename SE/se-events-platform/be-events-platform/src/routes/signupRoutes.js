const express = require('express');
const { signupForEvent } = require('../controllers/signupController');
const { authenticateJWT } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authenticateJWT, signupForEvent);
router.get('/signup', authenticateJWT, signupForEvent);

module.exports = router;
