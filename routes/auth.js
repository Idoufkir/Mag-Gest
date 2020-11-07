const express = require('express');
const authController = require('../controllers/auth')
const authGuard = require("./guards/auth.guard");
const router = express.Router();



router.post('/register', authController.register);

router.post('/login', authController.login);

router.all('/logout', authController.logout);

module.exports = router;