const db = require("../models");
const event = db.event;

exports.getAllEvents = (req, res) => {
    event.find({}, (err, events) => {
        if (err) {
            res.send(err);
        }
        res.json(events);
    });
};

exports.getOneEvent = (req, res) => {
    event.findById(req.body.eventId, (err, event) => {
        if (err) {
            res.send(err);
        }
        res.json(event);
    });
};

exports.create = (req, res) => {
    event.create({
        creater: req.body.creater,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        location: req.body.location,
        start: req.body.start,
        end: req.body.end,
        icon: req.body.icon,
        maxParticipants: req.body.maxParticipants,
        group: req.body.group,
        cost: req.body.cost,
        preSale: req.body.preSale,
        preSaleEvent: req.body.preSaleEvent,
    }, (err, event) => {
        if (err) return res.status(400).send(err);
        return res.json(event);
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



