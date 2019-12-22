const express = require('express');

const router = express.Router();

const cocktailController = require('../controllers/cocktailController.js');

//example of router.something syntax
// router.post('/signup', userController.signUpUser);

module.exports = router;
