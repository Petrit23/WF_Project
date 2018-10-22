const mongoose = require('mongoose');
const Users = mongoose.model('User');

const UsersCreate = function (req, res) {
    Users.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    }, (err, user) => {
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
};

const UsersReadOne = function (req, res) {
    if (req.params && req.params.userid) {
        Users
            .findById(req.params.userid)
            .exec((err, user) => {
                if (!user) {
                    res
                        .status(404)
                        .json({
                            "message": "Userid not found"
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
                    .json(user);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No Userid in request"
            });
    }
};

const UsersUpdateOne = function (req, res) {
    if (!req.params.userid) {
        res
            .status(404)
            .json({
                "message": "Not found, userid is required"
            });
        return;
    }
    Users
        .findById(req.params.userid)
        .exec((err, user) => {
                if (!user) {
                    res
                        .json(404)
                        .status({
                            "message": "userid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(400)
                        .json(err);
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;
                user.username = req.body.username;
                user.password = req.body.password;
                user.save((err, user) => {
                    if (err) {
                        res
                            .status(404)
                            .json(err);
                    } else {
                        res
                            .status(200)
                            .json(user);
                    }
                });
            }
        );
};

const UsersDeleteOne = function (req, res) {
    const userid = req.params.userid;
    if (userid) {
        Users
            .findByIdAndRemove(userid)
            .exec((err, user) => {
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
                "message": "No userid"
            });
    }
};


module.exports = {
    UsersCreate,
    UsersReadOne,
    UsersUpdateOne,
    UsersDeleteOne
};
