const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE
});


exports.login = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status(400).render('login', {
                message: 'Please Provide an Email & Password'
            })
        }
        connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
                console.log(results);
                if( !results || !(await bcrypt.compare(password, results[0].password) ) ) { 
                    res.status(401).render('login', {
                        message: 'Email or password is incorrect.'
                    })
                } else {
                    const id = results[0].id;

                    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });

                    console.log("The token is: " + token);

                    console.log("The ID is: " + id);

                    const cookieOption = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true
                    };
                    req.session.isLoggedIn = true;
                    res.cookie('jwt', token, cookieOption);
                    res.status(200).redirect("/dashboard");
                    
                }
            })
        
    } catch (error) {
        console.error();
    }
    
}


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

exports.logout = async function(req, res) {
    res.clearCookie('jwt');
    req.session.destroy( function(err) {
        res.redirect("/")
    });
};

exports.verifyToken = function(req, res, next) {
    // get auth header value
    // Format of token : authorization: Bearer <token>
    const bearerHeader = req.headers['authorization']
    
    if (typeof bearerHeader !== "undefined") {
        // split at the space
        const bearer = bearerHeader.split(' ')
        // get token from array
        const token = bearer[1]
        // set the token
        req.token = token
        // next middleware
        next()
    } else {
        // Forbidden
        res.sendStatus(403)
    }

};