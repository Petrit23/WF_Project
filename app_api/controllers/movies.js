const mongoose = require('mongoose');
const Movies = mongoose.model('Movie');

const MoviesCreate = function (req, res) {
    Movies.create({
        title: req.body.title,
        email: req.body.email,
        description: req.body.description,
        imageURL: req.body.imageURL,
    }, (err, movie) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(movie);
        }
    });
};

const MoviesReadOne = function (req, res) {
    if (req.params && req.params.movieid) {
        Movies
            .findById(req.params.movieid)
            .exec((err, movie) => {
                if (!movie) {
                    res
                        .status(404)
                        .json({
                            "message": "Movieid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(200)
                    .json(movie);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No Movieid in request"
            });
    }
};

const MoviesUpdateOne = function (req, res) {
    if (!req.params.movieid) {
        res
            .status(404)
            .json({
                "message": "Not found, movieid is required"
            });
        return;
    }
    Movies
        .findById(req.params.movieid)
        .exec((err, movie) => {
                if (!movie) {
                    res
                        .json(404)
                        .status({
                            "message": "movieid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(400)
                        .json(err);
                    return;
                }
                movie.title = req.body.title;
                movie.description = req.body.description;
                movie.imageURL = req.body.imageURL;
                movie.save((err, movie) => {
                    if (err) {
                        res
                            .status(404)
                            .json(err);
                    } else {
                        res
                            .status(200)
                            .json(movie);
                    }
                });
            }
        );
};

const MoviesDeleteOne = function (req, res) {
    const movieid = req.params.movieid;
    if (movieid) {
        Movies
            .findByIdAndRemove(movieid)
            .exec((err, movie) => {
                    if (err) {
                        res
                            .status(404)
                            .json(err);
                        return;
                    }
                    res
                        .status(204)
                        .json(null);
                }
            );
    } else {
        res
            .status(404)
            .json({
                "message": "No movieid"
            });
    }
};


module.exports = {
    MoviesCreate,
    MoviesReadOne,
    MoviesUpdateOne,
    MoviesDeleteOne,
};