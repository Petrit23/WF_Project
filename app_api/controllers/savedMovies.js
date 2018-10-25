const mongoose = require('mongoose');
const Users = mongoose.model('User');

const _doAddSavedMovie = function(req, res, user) {
    if (!user) {
        res
            .status(404)
            .json({
                "message": "userid not found"
            });
    } else {
        user.savedMovies.push({
            title: req.body.title,
            description: req.body.description,
            videoURL: req.body.videoURL
        });
        user.save((err, user) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                res
                    .status(201)
                    .json(user);
            }
        });
    }
};

const savedMoviesCreate = function(req, res) {
    const userid = req.params.userid;
    if (userid) {
        Users
            .findById(userid)
            .select('savedMovies')
            .exec((err, user) => {
                    if (err) {
                        res
                            .status(400)
                            .json(err);
                    } else {
                        _doAddSavedMovie(req, res, user);
                    }
                }
            );
    } else {
        res
            .status(404)
            .json({"message": "Not found, userid required"
            });
    }
};

const savedMoviesReadOne = function (req, res) {
    if (req.params && req.params.userid && req.params.savedMovieid) {
        Users
            .findById(req.params.userid)
            .exec((err, user) => {
                if (!user) {
                    res
                        .status(404)
                        .json({
                            "message": "userid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                if (user.savedMovies && user.savedMovies.length > 0) {
                    const savedMovie =user.savedMovies.id(req.params.savedMovieid);
                    if (!savedMovie) {
                        res
                            .status(404)
                            .json({
                                "message": "savedMovieid not found"
                            });
                    } else {
                        response = {
                            user : {
                                name : user.name,
                                id : req.params.userid
                            },
                            savedMovie : savedMovie
                        };
                        res
                            .status(200)
                            .json(response);
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            "message": "No savedMovies found"
                        });
                }
            });
    } else {
        res
            .status(404)
            .json({
                "message": "Not found, userid and savedMovieid are both required"
            });
    }
};

const savedMoviesUpdateOne = function (req, res) {
    if (!req.params.userid || !req.params.savedMovieid) {
        res
            .status(404)
            .json({
                "message": "Not found, userid and savedMovieid are both required"
            });
        return;
    }
    Users
        .findById(req.params.userid)
        .select('savedMovies')
        .exec((err, user) => {
                if (!user) {
                    res
                        .status(404)
                        .json({
                            "message": "userid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(400)
                        .json(err);
                    return;
                }
                if (user.savedMovies && user.savedMovies.length > 0) {
                    let thisSavedMovie = user.savedMovies.id(req.params.savedMovieid);
                    if (!thisSavedMovie) {
                        res
                            .status(404)
                            .json({
                                "message": "savedMovieid not found"
                            });
                    } else {
                        thisSavedMovie.title = req.body.title;
                        thisSavedMovie.description = req.body.description;
                        thisSavedMovie.videoURL = req.body.videoURL;
                        user.save((err, user) => {
                            if (err) {
                                res
                                    .status(404)
                                    .json(err);
                            } else {
                                res
                                    .status(200)
                                    .json(thisSavedMovie);
                            }
                        });
                    }
                } else {
                    res
                        .status(404)
                    json({
                        "message": "No savedMovie to update"
                    });
                }
            }
        );
};


const savedMoviesDeleteOne = function (req, res) {
    if (!req.params.userid || !req.params.savedMovieid) {
        res
            .status(404)
            .json({
                "message": "Not found, userid and savedMovieid are both required"
            });
        return;
    }
    Users
        .findById(req.params.userid)
        .select('savedMovies')
        .exec((err, user) => {
                if (!user) {
                    res
                        .status(404)
                        .json({
                            "message": "userid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(400)
                        .json(err);
                    return;
                }
                if (user.savedMovies && user.savedMovies.length > 0) {
                    if (!user.savedMovies.id(req.params.savedMovieid)) {
                        res
                            .status(404)
                            .json({
                                "message": "savedMovieid not found"
                            });
                    } else {
                        user.savedMovies.id(req.params.savedMovieid).remove();
                        user.save((err) => {
                            if (err) {
                                res
                                    .status(404)
                                    .json(err);
                            } else {
                                res
                                    .status(204)
                                    .json(null);
                            }
                        });
                    }
                } else {
                    res
                        .status(404)
                        .json({
                            "message": "No savedMovie to delete"
                        });
                }
            }
        );
};



module.exports = {
    savedMoviesCreate,
    savedMoviesReadOne,
    savedMoviesUpdateOne,
    savedMoviesDeleteOne
};
