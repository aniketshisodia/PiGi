const express = require('express');
const userController = require('../controllers/userControllers');
const router = express.Router();
const authController = require('../controllers/authController');

//define signup route
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

module.exports = router;