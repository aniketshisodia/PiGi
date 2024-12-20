const express = require('express');
const userController = require('../controllers/userControllers');
const router = express.Router();

//define signup route
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

module.exports = router;