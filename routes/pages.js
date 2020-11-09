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




router.get('/add-mgsn', authGuard.isAuth,(req, res) => {
    let idM;
    let idF;
    let sql1 = "SELECT id_mgsn FROM magasinier";
    let sql2 =  "SELECT id_spct,spct FROM specialite";
    connection.query(sql1, (err, rows) => {
  
      idM = rows;
        if(err) throw err;
        connection.query(sql2, (err, rows) => {
          idF = rows;
            if(err) throw err;
        res.render('addMag', {
            title : 'Ajouter Un magasinier',
            idM : idM,
            idF : idF
  
        });
        });
          });
  });

router.post('/save-mag',  authGuard.isAuth,(req, res) => {

    let data = {id_mgsn: req.body.id_mgsn, nom: req.body.nom, prenom: req.body.prenom, salaire: req.body.salaire, age: req.body.age, tele: req.body.tele};
    let sql = "INSERT INTO produit SET ?";
    connection.query(sql, data,(err, results) => {
      if(err) return err;
      res.redirect('/produits');
    });
});

module.exports = router;