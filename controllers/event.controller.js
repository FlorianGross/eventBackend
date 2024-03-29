const db = require("../models");
const User = require("../models/user.model");
const Event = db.event;

exports.getAllEvents = (req, res) => {
    Event.find({}, (err, events) => {
        if (err) {
            res.send(err);
        }
        res.json(events);
    });
};

exports.getOneEvent = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) {
            res.send(err);
        }
        res.json(event);
    });
};

exports.create = (req, res) => {
    Event.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        location: req.body.location,
        start: req.body.start,
        end: req.body.end,
        maxParticipants: req.body.maxParticipants,
        preSale: req.body.preSale,
        preSaleInfo: req.body.preSaleInfo,
        cost: req.body.cost,
        eventSpecials: req.body.eventSpecials,
        contactPerson: req.body.contactPerson,
        contactEmail: req.body.contactEmail,
        contactPhoneNumber: req.body.contactPhoneNumber,
    }, (err, event) => {
        if (err) return res.status(400).send(err);
        return res.json(event);
    });
};

exports.change = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) {
            res.send(err);
        }
        event.name = req.body.name;
        event.description = req.body.description;
        event.image = req.body.image;
        event.location = req.body.location;
        event.start = req.body.start;
        event.end = req.body.end;
        event.maxParticipants = req.body.maxParticipants;
        event.preSale = req.body.preSale;
        event.preSaleInfo = req.body.preSaleInfo;
        event.cost = req.body.cost;
        event.eventSpecials = req.body.eventSpecials;
        event.contactPerson = req.body.contactPerson;
        event.contactEmail = req.body.contactEmail;
        event.contactPhoneNumber = req.body.contactPhoneNumber;
        event.save((err, event) => {
            if (err) {
                res.send(err);
            }
            res.json(event);
        });
    });
};

exports.delete = (req, res) => {
    Event.findByIdAndRemove(req.params.id, (err, event) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send(event);
    });
};

exports.participate = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) {
            res.send(err);
        }
        if (event.participants.includes(req.body.user)) {
            event.participants.pull(req.body.user);
        } else {
            if (event.participants.length < event.maxParticipants) {
                event.participants.push(req.body.user);
            } else {
                res.json({ message: "Event is full" });
            }
            event.save((err, event) => {
                if (err) {
                    res.send(err);
                }
                res.json(event);
            });
        }

    });
}

exports.getAllParticipants = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) {
            res.send(err);
        }
        User.find({
            _id: { $in: event.participants }
        }, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });
}

exports.preOrder = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) {
            res.send(err);
        }
        if (event.preOrder.includes(req.body.user)) {
            event.preorder.pull(req.body.user);
        } else {
            event.preorder.push(req.body.user);
        }
        event.save((err, event) => {
            if (err) {
                res.send(err);
            }
            res.json(event);
        });

    });
}

exports.getPreOrder = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if (err) {
            res.send(err);
        }
        User.find({
            _id: { $in: event.preOrder }
        }, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });
}

exports.getAllEventsWhereUserIsInvolved = (req, res) => {
    Event.find({
        participants: req.params.id
    }, (err, events) => {
        if (err) {
            res.send(err);
        }
        Event.find({
            preorder: req.params.id
        }, (err, event) => {
            if (err) {
                res.send(err);
            }
            Array.apply(events, event);
            res.json(events);
        });
    });
}

