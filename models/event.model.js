const mongoose = require("mongoose");
const Event = mongoose.model(
    "Event",
    {
        uid: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        start: {
            type: Date,
            required: true
        },
        ende: {
            type: Date,
            required: true
        },
        icon: {
            type: String,
            required: false
        },
        maxParticipants: {
            type: Number,
            required: true
        },
        organizer: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
    });

module.exports = Event;

