const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlMovies = require('../controllers/movies');


// users
router
    .route('/users')
    .get(ctrlUsers.UsersCreate)
    .post(ctrlUsers.UsersCreate);

router
    .route('/users/:userid')
    .get(ctrlUsers.UsersReadOne)
    .put(ctrlUsers.UsersUpdateOne)
    .delete(ctrlUsers.UsersDeleteOne);

// movies
router
    .route('/movies')
    .get(ctrlMovies.MoviesCreate)
    .post(ctrlMovies.MoviesCreate);

router
    .route('/movies/:movieid')
    .get(ctrlMovies.MoviesReadOne)
    //.put(ctrlMovies.MoviesUpdateOne)
    .delete(ctrlMovies.MoviesDeleteOne);

module.exports = router;
