const db = require("../models");
const event = db.event;

exports.userBoard = (req, res) => {
    event.find({ uid: req.body.user }).lean().exec(function (err, event) {
        return res.json(event);
    });
};

exports.create = (req, res) => {
    const newEvent = new event({
        uid: req.body.uid,
        description: req.body.description,
        location: req.body.location,
        start: req.body.start,
        ende: req.body.ende,
        icon: req.body.icon,
        maxParticipants: req.body.maxParticipants,
        organizer: req.body.organizer,
        cost: req.body.cost,
    });
    newEvent.save((err, event) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(event);
    });
};

exports.change = (req, res) => {
    event.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, event) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(event);
    });
};

exports.delete = (req, res) => {
    event.findByIdAndRemove(req.body._id, (err, event) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(event);
    });
};

exports.participate = (req, res) => {
    event.findByIdAndUpdate(req.body._id, { $push: { participants: req.body.uid } }, { new: true }, (err, event) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(event);
    });
};

exports.unparticipate = (req, res) => {
    event.findByIdAndUpdate(req.body._id, { $pull: { participants: req.body.uid } }, { new: true }, (err, event) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(event);
    });
};



