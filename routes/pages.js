const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mysql = require('mysql');
const authGuard = require("./guards/auth.guard");
const authController = require('../controllers/auth');


const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE
});
connection.connect((error)=>{
    if(error) console.log(error);
     console.log('Database Connected!');
});


router.get('/', (req, res) => {
	let sql = "SELECT * FROM magasinier";
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('index', {
            title : 'home',
            rows : rows
        });

    });
});

router.get('/login', (req, res) => {
	res.render("login");
});

router.get('/register', (req, res) => {
	res.render("register");
});

router.get('/logout', (req, res) => {
	res.render("index");
});

router.get('/dashboard', authGuard.isAuth, (req, res) => {
	res.render("dashboard");
});






module.exports = router;