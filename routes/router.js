// routes/router.js
const express = require('express');
const router = express.Router();

const connection = require('../db/db.js');

router.get('/vinyls', async (request, response) => {
    connection.query('SELECT * FROM vinyl;', function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            response.status(200).json(results);
            console.log('Mes vinyls: ', results);
        }
    });
});

router.post('/vinyls/create', async (request, response) => {
    const artiste = request.body.artiste;
    const album = request.body.album;
    const label = request.body.label;
    const date_de_sortie = request.body.date_de_sortie;

    let sql = 'INSERT INTO vinyl (artiste, album, label, date_de_sortie) VALUES (?, ? , ?, ?);'
    connection.query(sql, [
            artiste, 
            album, 
            label, 
            date_de_sortie
        ], function (error, rows) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            response.status(201).json({
                message: 'Vinyl from ' + artiste + ' create successfully!'
            });
        }
    });
});

router.put('/vinyls/update/:id([0-9]+)', async (request, response) => {
    const vinyl_id = parseInt(request.params.id);
    const artiste = request.body.artiste;
    const album = request.body.album;
    const label = request.body.label;
    const date_de_sortie = request.body.date_de_sortie
    // const sql = 'UPDATE vinyl SET artiste = ?, album = ?, label = ?, date_de_sortie = ? WHERE id = "' + vinyl_id + '";';
    const sql = 'UPDATE vinyl SET artiste = ?, album = ?, label = ?, date_de_sortie = ? WHERE id = ?;';


    const body = [artiste, album, label, date_de_sortie, vinyl_id];
    connection.query(sql, body, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            console.log('Vinyl ' + vinyl_id + ' mis à jour');
            response.status(201).json({
                message: 'Vinyl ' + vinyl_id + ' updated successfully!'
            });
        }
    });
})

router.delete('/vinyls/delete/:id([0-9]+)', async (request, response) => {
    const vinyl_id = parseInt(request.params.id);
    const sql = 'DELETE FROM vinyl WHERE id = ?;';

    connection.query(sql, [vinyl_id], function (error, rows) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            console.log(rows.affectedRows + " record(s) updated");
            console.log('Vinyl ' + vinyl_id + ' supprimé');

            response.status(201).json({
                message: 'Vinyl ' + vinyl_id + ' deleted successfully!'
            });
        }
    });
});

router.get('*', (request, response) => {
    response.status(500).json({ message: "Aucune donnée disponible à cette adresse" })
});

module.exports = router;