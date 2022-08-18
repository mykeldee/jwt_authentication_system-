const express = require('express');

const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.example)

router.post('/auth/login', controller.logIn)

router.get('/auth/signUp', controller.signUp)

module.exports = router;

