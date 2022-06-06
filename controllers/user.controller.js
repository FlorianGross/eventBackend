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
    Role.find({ name: req.body.role }).then
        (role => {
            console.log(role);
            User.findOneAndUpdate({ username: req.body.username }, {
                $push: {
                    roles: role._id,
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


