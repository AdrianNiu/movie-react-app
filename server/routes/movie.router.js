const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all movies
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM  movies ORDER BY title';
    pool.query(queryText)
        .then((result) => {
            console.log('Got movie on server', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error completing GET all movie query', err);
            res.sendStatus(500);
        });
});

// Return a selected movie
router.post('/details/:id', (req, res) => {
    console.log('The post request is:', req.body);
    const movie_id = req.body;
    const queryText = `SELECT * FROM movies WHERE movies.id = $1;`;
    pool.query(queryText, [movie_id.movieId])
        .then((result) => {
            console.log(result.rows[0]);
            res.send(result.rows[0]);
        })
        .catch((error) => {
            console.log('Error on POST selected movie', error);
            res.sendStatus(500);
        });
});

// Edit the state with the selected id
router.put(`/:id`, (req, res) => {
    console.log('The put request is:', req.params.id, req.body);
    let id = req.params.id;
    let data = req.body;
    let queryText = `UPDATE movies SET title = $1, description = $2 WHERE "id" = $3;`;
    pool.query(queryText, [data.title, data.description, id])
        .then((result) => {
            console.log('Successful updated database');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error on PUT change to movie', error);
            res.sendStatus(500);
        });
});



module.exports = router;