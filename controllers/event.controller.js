const db = require("../models");
const event = db.event;

exports.allAccess = (req, res) => {
    event.find().lean().exec(function (err, event){
        return res.json(event);
    });
};
exports.userBoard = (req, res) => {
    event.find({uid: req.body.user}).lean().exec(function (err, event){
        return res.json(event);
    });
};
