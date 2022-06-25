const secret = "key";
const db = require("../models");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// https://www.bezkoder.com/node-js-mongodb-auth-jwt/
exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),

    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else {
            Role.findOne({ name: "User" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};
// https://www.bezkoder.com/node-js-mongodb-auth-jwt/
exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: user.id }, secret, {
                expiresIn: 604800 // 1 week
            });
            var authorities = [];
            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                imageUrl: user.imageUrl,
                email: user.email,
                roles: authorities,
                accessToken: token,
            });
        });
};

// own function
exports.getIsAdmin = (req, res) => {
    console.log(req.body);
    User.findOne({
        username: req.body.username
    }).then(user => {
        Role.findOne({ name: "Admin" }).then(role => {
            if (user.roles.includes(role._id)) {
                res.send(true);
            }
            else {
                res.send(false);
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving user."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user."
        });
    }
    );
};

