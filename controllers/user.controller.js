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
    console.log(req.body.user);
    console.log(req.body.user.firstName);
    User.findOneAndUpdate({ username: req.body.user.username }, {
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
        }
    }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
}
exports.saveImage = (req, res) =>{
    User.findOneAndUpdate({ username: req.body.user.username }, {
        $set: {
            image: req.body.user.image,
        }
    }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
        }
        console.log(user);
        res.json(user);
    });
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


