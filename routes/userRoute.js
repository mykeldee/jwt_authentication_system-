const express = require('express');
const { check } = require('express-validator')

const router = express.Router();
const controller = require('../controllers/userController');

router.post('/auth/login', [check("email", "Please enter a valid email").isEmail, check("password", "A valid password is required").exists()], controller.logIn)

router.post('/auth/register', controller.register)

module.exports = router;

