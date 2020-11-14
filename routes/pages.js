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

router.post('/save-mag', authGuard.isAuth, (req, res) => {
    let data = {nom: req.body.nom, prenom: req.body.prenom, salaire: req.body.salaire, age: req.body.age, tele: req.body.tele, id_spct: req.body.id_spct};
    let sql = "INSERT INTO magasinier SET ?";
    connection.query(sql, data,(err, results) => {
      if(err) return err;
      res.redirect('/dashboard');
    });
});

router.get('/delete/mag/:idM',(req, res) => {
  const idM = req.params.idM;
  let sql = `DELETE from magasinier where id_mgsn = ${idM}`;
  let query = connection.query(sql,(err, result) => {
      if(err) throw err;
      res.redirect('/dashboard');
  });
});


router.get('/edit/mag/:idM',(req, res) => {

  const idM = req.params.idM;
  let idF;
  let sql1 = `SELECT * FROM specialite`;
  let sql = `SELECT * FROM  magasinier where id_mgsn = ${idM}`;
  connection.query(sql, sql1, (err, rows) => {
      idF = rows;
        if(err) throw err;
        connection.query(sql, (err, results) => {
          idF = rows;
            if(err) throw err;
        res.render('modifier-mag', {
            title : 'Modification des données Mag',
            row : results[0],
            idF : idF
  
        });
        });
          });
  });


  router.post('/edit-mag',(req, res) => {

    let idM = req.body.id_mgsn;
    let sql = `UPDATE magasinier SET nom = '${req.body.nom}', prenom = '${req.body.prenom}', salaire = '${req.body.salaire}', age = '${req.body.age}', tele = '${req.body.tele}', id_spct = '${req.body.id_spct}' where id_mgsn = ${idM}`;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/dashboard');
    });
});

router.get('/ajtdep' ,authGuard.isAuth, (req, res) =>{
  res.render('ajt-departement');
});

router.post('/ajt-depatrement', authGuard.isAuth, (req, res) =>{

  let data = {spct: req.body.spct};
    let sql = "INSERT INTO specialite SET ?";
    connection.query(sql, data,(err, results) => {
      if(err) return err;
      res.redirect('/dashboard');
    });
})


module.exports = router;