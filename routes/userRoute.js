const express = require('express');

const router = express.Router();
const controller = require('../controllers/userController');

router.post('/auth/register', controller.logIn)

router.post('/auth/signUp', controller.register)

module.exports = router;

