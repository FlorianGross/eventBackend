// https://www.bezkoder.com/node-js-mongodb-auth-jwt/

const db = require("../models");
const User = db.user;
const Role = db.role;

exports.getAllUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
}

exports.updateUser = (req, res) => {
    let cRole = req.body.roles;
    let cUser = req.body.id;
    Role.find({ name: cRole })
        .then(role => {
            User.findOne({ username: cUser }).then(user => {
                testRoles = user.roles;

            });
            User.findOneAndUpdate({ username: cUser }, {
                $push: {
                    roles: role,
                }
            }, { new: true }, (err, user) => {
                if (err) {
                    res.send(err);
                }
                res.json(user);
            });
        }
        ).catch(err => {
            res.send(err);
        }
        );
}

exports.setUserData = (req, res) => {
    User.findOneAndUpdate({ username: req.params.id }, {
        $set: {
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            email: req.body.user.email,
            phoneNumber: req.body.user.phoneNumber,
            city: req.body.user.city,
            street: req.body.user.street,
            streetNumber: req.body.user.streetNumber,
            zip: req.body.user.zip,
            country: req.body.user.country,
            image: req.body.user.image,
        }
    }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
}

exports.deleteUser = (req, res) => {
    User.findOneAndRemove({ username: req.params.id }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
}

exports.saveImage = (req, res) => {
    User.findOneAndUpdate({ username: req.body.username }, {
        $set: {
            image: req.body.user.image,
        }
    }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
}

exports.getUserData = (req, res) => {
    User.findOne({ username: req.params.id }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    }
    );
}


