const express = require('express');
const app = express();
const mysql = require('mysql');
const helmet = require("helmet");
const cors = require('cors');


require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = 3000;
const corsOptions = {
    origin: 'http://localhost:3000/api-docs/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors());
app.use(helmet());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
);


app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// Utilisation du fichier de configuration .env
let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_API,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
});

connection.connect();

app.get('/vinyls', async (request, response) => {
    connection.query('SELECT * FROM vinyl;', function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            response.status(200).json(results);
            console.log('Mes vinyls: ', results);
        }
    });
});

app.post('/vinyls/create', async (request, response) => {
    const artiste = request.body.artiste
    const album = request.body.album
    const label = request.body.label
    const date_de_sortie = request.body.date_de_sortie

    let sql = 'INSERT INTO vinyl (artiste, album, label, date_de_sortie) VALUES (?, ? , ?, ?);'
    connection.query(sql, [artiste, album, label, date_de_sortie], function (error, rows) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            response.status(201).json({
                message: 'Vinyl from ' + artiste + ' create successfully!'
            });
        }
    });
});

app.put('/vinyls/update/:id([0-9]+)', async (request, response) => {
    const vinyl_id = parseInt(request.params.id);
    const artiste = request.body.artiste
    const album = request.body.album
    const label = request.body.label
    const date_de_sortie = request.body.date_de_sortie
    const sql = 'UPDATE vinyl SET artiste = ?, album = ?, label = ?, date_de_sortie = ? WHERE id = "' + vinyl_id + '";';

    const body = [artiste, album, label, date_de_sortie];
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

app.delete('/vinyls/delete/:id([0-9]+)', async (request, response) => {
    const vinyl_id = parseInt(request.params.id);
    const sql = 'DELETE FROM vinyl WHERE id = ?;'

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

app.get('*', (request, response) => {
    response.status(500).json({ message: "Aucune donnée disponible à cette adresse" })
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
    console.log(`Swagger doc Listening at http://localhost:${port}/api-docs/`);
});