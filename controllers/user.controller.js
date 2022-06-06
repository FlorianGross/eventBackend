const { role } = require("../models");
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
    console.log(req.body);
    User.findOneAndUpdate({ username: req.body.username }, {
        $push: {
            roles: req.body.role
        }
    }, { new: true }, (err, user) => {
        if (err) {
            res.send(err);
        }
        console.log(user.roles);
        res.json(user);
    });
}

