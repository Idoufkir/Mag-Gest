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
	req.session.destroy( function(err) {
        res.redirect("/")
    });
});




router.get('/add-mgsn', authGuard.isAuth, (req, res) => {
  let sql = "SELECT * FROM specialite";
  connection.query(sql, (err, rows) => {
      if(err) throw err;
      res.render('addMag', {
          title : 'Ajouter un Magasinier',
          rows : rows
      });

  });
  });

router.post('/save-mag', (req, res) => {
    let data = {nom: req.body.nom, prenom: req.body.prenom, salaire: req.body.salaire, age: req.body.age, tele: req.body.tele, id_spct: req.body.id_spct};
    let sql = "INSERT INTO magasinier SET ?";
    connection.query(sql, data,(err, results) => {
      if(err) return err;
      res.redirect('/dashboard');
    });
});


module.exports = router;