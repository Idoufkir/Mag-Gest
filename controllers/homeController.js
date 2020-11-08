const connection = require('../cnx');

exports.getHome = (req, res, next) => {
    let sql = "SELECT id_mgsn,nom,prenom,salaire,age,tele,spct FROM  (magasinier INNER JOIN specialite ON magasinier.id_spct = specialite.id_spct)";
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('index', {
            title : 'Mag&Gest',
            rows : rows
        });

    });

};
