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
    User.findOneAndUpdate({ _id: req.body.id }, {
        $set: {
            roles: role.find(r => r.name === req.body.role)
        }
    }, { new: true }, (err, user) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        res.json(user);
        console.log(user);
    });
}

