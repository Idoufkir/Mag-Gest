const myqsl = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE
}); 

exports.login = async (req, res) => {
    try{

        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status(400).render('login', {
                message: 'Please Provide an Email & Password'
            })
        }
            db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
                console.log(results);
                if( !results || !(await bcrypt.compare(password, results[0].password) ) ) { 
                    res.status(401).render('login', {
                        message: 'Email or password is incorrect.'
                    })}
            } )
        
    } catch (error) {
        console.error();
    }
}