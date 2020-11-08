const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authGuard = require("./guards/auth.guard");
const authController = require('../controllers/auth');
const connection = require('../cnx');


router.get('/login', (req, res) => {
	res.render("login");
});

router.get('/register', (req, res) => {
	res.render("register");
});

router.get('/logout', (req, res) => {
	res.render("index");
});





module.exports = router;