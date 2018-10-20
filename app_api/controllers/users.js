const mongoose = require('mongoose');
const Users = mongoose.model('User');

const UsersCreate = function (req, res) {
    res
        .status(200)
        .json({"status" : "success"});
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
    res
    .status(200)
    .json({"status" : "success"});
};
const UsersDeleteOne = function (req, res) {
    res
    .status(200)
    .json({"status" : "success"});
};



module.exports = {
    UsersCreate,
    UsersReadOne,
    UsersUpdateOne,
    UsersDeleteOne
};
