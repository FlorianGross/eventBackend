const db = require("../models");
const User = db.user;
const Role = db.role;

exports.getAllUsers = (req, res) => {
    console.log("User req. getAll: " + req.userId)
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
}

exports.updateUser = (req, res) => {
    console.log("User req. Change: " + req.userId)
    console.log(req.body);
    let cRole = req.body.roles;
    let cUser = req.body.id;
    Role.find({ name: cRole })
        .then(role => {
            console.log(role);
            User.findOne({ username: cUser }).then(user => {
                testRoles = user.roles;

            });
            User.findOneAndUpdate({ username: cUser }, {
                $push: {
                    roles: role,
                }
            }, { new: true }, (err, user) => {
                console.log(user);
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
    console.log(req.body);
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.send(err);
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.street = req.body.street;
        user.city = req.body.city;
        user.zip = req.body.zip;
        user.country = req.body.country;
        user.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    );
}

exports.getUserData = (req, res) => {
    console.log(req.body);
    console.log(req.body.username);
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.send(err);
        }
        console.log(user);
        res.json(user);
    }
    );
}


