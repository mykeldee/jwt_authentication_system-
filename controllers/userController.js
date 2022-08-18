const models = require("../models/Users");
require('dotenv').config()
const validator = require('email-validator');
const express = require('express');
const User = require('../models/users');
const bcrypt = require("bcryptjs/dist/bcrypt");
const { passwordStrength } = require('check-password-strength');
const jwt = require('jsonwebtoken');
const jwtValidate = require('../middlewares/jwt')

tka = process.env.ACCESS_TOKEN_SECRET
function generateAccessToken(email) {
    return jwt.sign(email, tka, { expiresIn: '60s' });
  };

tkf = process.env.REFRESS_TOKEN_SECRET
let refreshTokens = []
function generateRefreshToken(email) {
    const refreshToken =  jwt.sign(email, tkf, {expiresIn: "1800s"})
    // refreshTokens.push(refreshToken)
    return refreshToken
    };


//Register
exports.register =  async (req, res) => {
    const { email } = req.body;
    const chkuser = await User.findOne({ email }).exec();

    try{
        //Check if email is valid
        if ((validator.validate(req.body.email)) === false) {
            res.status(401).send("Invalid Email!\n");
        } 

        //Check if email exists
        else if (chkuser) {
            res.status(401).send ("User already exists!\n")
        }

        //Check password complexity
        else if (((passwordStrength(req.body.password).value)) === 'Too weak'){
            res.status(401).send("Password is too weak\n");
        } else {
        const { name, email, password } = req.body;
        encryptedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email: email.toLowerCase(), password: encryptedPassword });
        res.status(201).json([{response: 'Registration successful'},
            { name: user.name,
                email: user.email,
                dateJoined: user.dateJoined,
            }]);
            console.log(user);
        };
    } catch(err) {
        console.log(err);
    }

};

//Log In
exports.logIn =  async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!(user)) {
            res.status(404).send ("User does not exist!");
        }

        else if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = generateAccessToken ({user: req.body.email});
        const refreshToken = generateRefreshToken ({user: req.body.email});
        res.status(200).json({name: `${user.name}`, accessToken: accessToken, refreshToken: refreshToken});
        console.log(accessToken);
    } else {
    res.status(401).send("Password Incorrect!")
    }
} catch (err) {
    console.log(err);
}
};

