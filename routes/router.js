const express = require('express');
const router = express.Router();

const connection = require('../db/db.js');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();


/*
* ---------------------------------------------------------------
* REGISTER & LOGIN SYSTEM
* ---------------------------------------------------------------
*/
const userMiddleware = require('../middleware/users.js');

router.post('/sign-up', userMiddleware.validateRegister, (request, response, next) => {

    let username = request.body.username;
    let password = request.body.password;

    let firstSql = "SELECT * FROM users WHERE LOWER(username) = ? ;";
    connection.query(firstSql, username.toLowerCase(),
        (err, result) => {
            if (result.length > 0) {
                return response.status(409).send({
                    msg: 'This username is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return response.status(500).send({
                            msg: err
                        });
                    } else {
                        // has hashed pw => add to database
                        let insertUserSql = 'INSERT INTO users (username, secret_password, registered) VALUES (?, ?, now());';
                        connection.query(insertUserSql, [username, hash],
                            (err, result) => {
                                if (err) {
                                    return result.status(400).send({
                                        msg: err
                                    });
                                }
                                return response.status(201).send({
                                    msg: 'Registered!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

router.post('/login', (request, response, next) => {
    let username = request.body.username;
    let password = request.body.password;

    let sql = 'SELECT * FROM users WHERE username = ? ;'
    connection.query(
        sql, [username],
        (err, result) => {
            // user does not exists
            if (err) {
                //   throw err;
                return response.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return response.status(401).send({
                    msg: 'Username or password is incorrect!'
                });
            }
            // check password
            bcrypt.compare(
                password,
                result[0]['secret_password'],
                (bErr, bResult) => {
                    // wrong password
                    if (bErr) {
                        //   throw bErr;
                        return response.status(401).send({
                            msg: 'Username or password is incorrect!'
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign({
                            username: result[0].username,
                            userId: result[0].id_user
                        },
                            process.env.SECRET_JWT, {
                            expiresIn: '7d'
                        }
                        );
                        let sqlUpdateLastLogin = 'UPDATE users SET last_login = now() WHERE id_user = ? ;'
                        connection.query(
                            sqlUpdateLastLogin, [result[0].id_user],
                            (err, result) => { 
                                if (err) {
                                    return response.status(400).send({
                                        msg: err
                                    });
                                }
                            }
                        );
                        return response.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return response.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
});


/*
* ---------------------------------------------------------------
* VINYLS CRUD FOR EACH UNIQUE USER 
* Protected by isLoggedIn middleware
* ---------------------------------------------------------------
*/
router.get('/vinyl/get', userMiddleware.isLoggedIn, async (request, response) => {
    // Decoded token user info with middleware check
    const fk_id_user = request.userData.userId;

    const sql = 'SELECT * FROM vinyl WHERE fk_id_user = ? ;';
    connection.query(sql, fk_id_user, function (error, results) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            response.status(200).json(results);
        }
    });
});


router.post('/vinyl/create', userMiddleware.isLoggedIn, async (request, response) => {

    // Decoded token user info with middle check
    const fk_id_user = request.userData.userId;
    // Body data 
    const artist = request.body.artist;
    const album = request.body.album;
    const label = request.body.label;
    const release_date = request.body.release_date;

    let sql = 'INSERT INTO vinyl (fk_id_user, artist, album, label, release_date, date_added) VALUES (?, ?, ? , ?, ?, now());'
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

router.put('/vinyl/update/:id([0-9]+)', userMiddleware.isLoggedIn, async (request, response) => {
    // Decoded token user info with middle check
    const fk_id_user = request.userData.userId;
    // Path & Body data 
    const vinyl_id = parseInt(request.params.id);
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
            response.status(200).json({
                message: 'Vinyl ' + vinyl_id + ' from user ' + fk_id_user + ' updated successfully!'
            });
        }
    });
})

router.delete('/vinyl/delete/:id([0-9]+)', userMiddleware.isLoggedIn, async (request, response) => {
    // Decoded token user info with middle checkdleware
    const fk_id_user = request.userData.userId;
    // Path info 
    const vinyl_id = parseInt(request.params.id);

    const sql = 'DELETE FROM vinyl WHERE id = ? AND fk_id_user = ?;';

    connection.query(sql, [vinyl_id, fk_id_user], function (error, rows) {
        if (error) {
            response.status(400).send('Error in database operation');
        } else {
            response.status(200).json({
                message: 'Vinyl ' + vinyl_id + ' from user ' + fk_id_user + ' deleted successfully!'
            });
        }
    });
});

router.get('*', (request, response) => {
    response.status(500).json({ message: "No data at this adress" })
});

module.exports = router;