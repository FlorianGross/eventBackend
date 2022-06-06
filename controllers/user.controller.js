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
    var current = user.findOne({
        where: {
            _id: req.body._id
        }
    });
    current.update({
        roles: role.findOne({
            where: {
                name: req.body.role[1],
            }
        })
    });
    current.save(function (err) {
        if (err) {
            console.log(err);
        }
        console.log("updated");
    });
    res.json({
        message: "User updated successfully"
    });
}

