const mongoose = require('mongoose');
const Abouts = mongoose.model('About');

const AboutCreate = function (req, res) {
    Abouts.create({
        paragraph: req.body.paragraph,
    }, (err, about) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(about);
        }
    });
};

const AboutReadOne = function (req, res) {
    if (req.params && req.params.aboutid) {
        Abouts
            .findById(req.params.aboutid)
            .exec((err, about) => {
                if (!about) {
                    res
                        .status(404)
                        .json({
                            "message": "Aboutid not found"
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
                    .json(about);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No Aboutid in request"
            });
    }
};

const AboutUpdateOne = function (req, res) {
    if (!req.params.aboutid) {
        res
            .status(404)
            .json({
                "message": "Not found, aboutid is required"
            });
        return;
    }
    Abouts
        .findById(req.params.aboutid)
        .exec((err, about) => {
                if (!about) {
                    res
                        .json(404)
                        .status({
                            "message": "aboutid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(400)
                        .json(err);
                    return;
                }
                about.paragraph = req.body.paragraph;
                about.save((err, about) => {
                    if (err) {
                        res
                            .status(404)
                            .json(err);
                    } else {
                        res
                            .status(200)
                            .json(about);
                    }
                });
            }
        );
};

const AboutDeleteOne = function (req, res) {
    const aboutid = req.params.aboutid;
    if (aboutid) {
        Abouts
            .findByIdAndRemove(aboutid)
            .exec((err, about) => {
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
                "message": "No aboutid"
            });
    }
};


module.exports = {
    AboutCreate,
    AboutReadOne,
    AboutUpdateOne,
    AboutDeleteOne,
};