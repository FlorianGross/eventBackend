const jwt = require("jsonwebtoken");
const secret = "key";
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        req.userRole = getUserRole(userId);
        req.isAdmin = isAdmin(userId);
        console.log("User" + req.userId + " " + req.userRole + " " + req.isAdmin);
        next();
    });
};
const authJwt = {
    verifyToken,
};

function isAdmin(userId) {
    let userRole = getUserRole(userId);
    if (userRole === "Admin") {
        return true;
    }
    return false;
}

function getUserRole(userId) {
    User.findOne({ _id: userId }, (err, user) => {
        if (err) {
            throw err;
        }
        return user.roles[0].name;
    });
}

module.exports = authJwt;
