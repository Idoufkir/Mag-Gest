const connection = require('../cnx');

exports.getMag = (req, res, next) => {
	let sql = "SELECT * FROM  (magasinier INNER JOIN specialite ON magasinier.id_spct = specialite.id_spct)";
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('dashboard', {
            title : 'Admin - Mag&Gest',
            rows : rows
        });

    });

};
