const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE
});
connection.connect((error)=>{
    if(error) console.log(error);
     console.log('Database Connected!');
});

module.exports = connection;