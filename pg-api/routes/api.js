const express = require('express');
const router = express();

const pool = require('../modules/pool');

router.get('/countries', function (request, response) {
    pool.connect(function (err, db, done) {
        if (err) {
            console.error(err);
            response.status(500).send({ 'error': err });
        } else {
            db.query('SELECT * FROM COUNTRY', function (err, table) {
                done();
                if (err) {
                    return response.status(400).send({ error: err })
                } else {
                    return response.status(200).send(table.rows)
                }
            })
        }
    })
});

router.post('/new-country', function (request, response) {
    const country_name = request.body.country_name;
    const continent_name = request.body.continent_name;

    const country_values = [country_name, continent_name];

    pool.connect((err, db, done) => {

        // Call `done(err)` to release the client back to the pool (or destroy it if there is an error)
        done();
        if (err) {
            console.error('error open connection', err);
            return response.status(400).send({ error: err });
        }
        else {
            db.query('INSERT INTO COUNTRY( country_name, continent_name ) VALUES ($1,$2)',
                [...country_values], (err, table) => {
                    if (err) {
                        console.error('error running query', err);
                        return response.status(400).send({ error: err });
                    }
                    else {
                        console.log('Data Inserted: successfully!');
                        response.status(201).send({ message: 'Data Inserted!' })
                    }
                })
        }
    });

    console.log(request.body);
});


router.delete('/remove/:id', function (request, response) {
    const id = request.params.id;

    pool.connect(function (err, db, done) {
        if (err) {
            return response.status(400).send(err)
        } else {
            db.query('DELETE FROM COUNTRY WHERE ID = $1', [Number(id)], function (err, result) {
                done();
                if (err) {
                    return response.status(400).send(err)
                } else {
                    return response.status(200).send({ message: 'success delete record' })
                }
            })
        }
    })
    console.log(id);
});

module.exports = router;