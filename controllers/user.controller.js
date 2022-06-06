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
    let cRole = req.body.roles;
    let cUser = req.body.id;
    Role.find({ name: cRole }).then
        (role => {
            console.log(role);
            User.findOne({ username: cUser }).then(user => {
                testRoles = user.roles;
                if (testRoles[0] == role || testRoles[1] == role) {
                    throw new Error("Already Admin / User");
                }
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


