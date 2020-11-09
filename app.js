const path = require('path');
const express = require('express');
const hbs = require('handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;

dotenv.config({ path: './.env'});



app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'views'));

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(path.join(__dirname, 'public', 'dashboard','css')));
app.use(express.static(path.join(__dirname, 'public', 'dashboard','img')));
app.use(express.static(path.join(__dirname, 'public', 'dashboard','lib')));
app.use(express.static(publicDirectory));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
}));



// Define Routes
app.use('/', require('./routes/pages'));
app.use('/', require('./routes/home'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
























app.listen(port, (error)=>{
	console.log(`Listening on port ${port}`);
  });  