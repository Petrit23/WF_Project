const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlMovies = require('../controllers/movies');
const ctrSavedMovies = require('../controllers/savedMovies');



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

//savedMovies
router
    .route('/users/:userid/savedMovies')
    .post(ctrSavedMovies.savedMoviesCreate);

router
    .route('/users/:userid/savedMovies/:savedMovieid')
    .get(ctrSavedMovies.savedMoviesReadOne)
    .put(ctrSavedMovies.savedMoviesUpdateOne)
    .delete(ctrSavedMovies.savedMoviesDeleteOne);

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
