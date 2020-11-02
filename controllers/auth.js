const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE
});


exports.register = (req, res) => {
    console.log(req.body);


    const { email, password, passwordConfirm } = req.body;

    connection.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }

        if ( results.length > 0 ) {
            return res.render('register', {
                message: "That email is already in use"
            })
        } else if ( password !== passwordConfirm ) {
            return res.render('register', {
                message: "Password do not match!"
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        connection.query('INSERT INTO users SET ? ', {email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    messages: "User registered! Click here to Login"
                });
            }
        })
    });

    



}