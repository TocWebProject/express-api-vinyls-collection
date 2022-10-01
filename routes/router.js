const express = require('express');
const router = express.Router();

const connection = require('../db/db.js');

router.get('/vinyl/get/:id([0-9]+)', async (request, response) => {

    const fk_id_user = parseInt(request.params.id);

    const sql = 'SELECT * FROM vinyl WHERE fk_id_user = ? ;';


    connection.query(sql, fk_id_user, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            response.status(200).json(results);
            console.log('Mes vinyls: ', results);
        }
    });
});


router.post('/vinyl/create', async (request, response) => {
    const fk_id_user = request.body.fk_id_user;
    const artist = request.body.artist;
    const album = request.body.album;
    const label = request.body.label;
    const release_date = request.body.release_date;

    let sql = 'INSERT INTO vinyl (fk_id_user, artist, album, label, release_date) VALUES (?, ?, ? , ?, ?);'
    connection.query(sql, [fk_id_user, artist, album, label, release_date], function (error, rows) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            response.status(201).json({
                message: '' + artist + ' Vinyl from user ' + fk_id_user + ' create successfully !'
            });
        }
    });
});

router.put('/vinyl/update/:id([0-9]+)', async (request, response) => {
    const vinyl_id = parseInt(request.params.id);
    const fk_id_user = request.body.fk_id_user;
    const artist = request.body.artist;
    const album = request.body.album;
    const label = request.body.label;
    const release_date = request.body.release_date
    const sql = 'UPDATE vinyl SET artist = ?, album = ?, label = ?, release_date = ? WHERE id = ? AND fk_id_user = ? ;'

    const body = [artist, album, label, release_date, vinyl_id, fk_id_user];
    connection.query(sql, body, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            console.log('Vinyl ' + vinyl_id + ' from user ' + fk_id_user + ' updated successfully');
            response.status(201).json({
                message: 'Vinyl ' + vinyl_id + ' from user ' + fk_id_user + ' updated successfully!'
            });
        }
    });
})

router.delete('/vinyl/delete/:id([0-9]+)', async (request, response) => {
    const vinyl_id = parseInt(request.params.id);
    const fk_id_user = request.body.fk_id_user;

    const sql = 'DELETE FROM vinyl WHERE id = ? AND fk_id_user = ?;';

    connection.query(sql, [vinyl_id, fk_id_user], function (error, rows) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            console.log('Vinyl ' + vinyl_id + ' deleted successfully');
            response.status(201).json({
                message: 'Vinyl ' + vinyl_id + ' from user ' + fk_id_user + ' deleted successfully!'
            });
        }
    });
});

router.get('*', (request, response) => {
    response.status(500).json({ message: "No data at this adress" })
});

module.exports = router;