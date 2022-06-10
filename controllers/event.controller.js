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
    console.log(req.body);
    event.findById(req.body.id, (err, event) => {
        if (err) {
            res.send(err);
        }
        res.json(event);
    });
};

exports.create = (req, res) => {
    event.create({
        name: event.name,
        description: event.description,
        image: event.image,
        location: event.location,
        start: event.start,
        end: event.end,
        maxParticipants: event.maxParticipants,
        preSale: event.preSale,
        preSaleInfo: event.preSaleInfo,
        cost: event.cost,
        eventSpecials: event.eventSpecials,
        contactPerson: event.contactPerson,
        contactEmail: event.contactEmail,
        contactPhoneNumber: event.contactPhoneNumber,
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



