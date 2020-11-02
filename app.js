const path = require('path');
const express = require('express');
const ejs = require('ejs');
const hbs = require('handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;

dotenv.config({ path: './.env'});




const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE
});
 
connection.connect((error)=>{
    if(error) console.log(error);
     console.log('Database Connected!');
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'views'));


// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


























app.listen(port, (error)=>{
	console.log(`Listening on port ${port}`);
  });  