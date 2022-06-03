const mongoose = require("mongoose");
const Event = mongoose.model(
    "Event",
    {
        creater: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: false
        },
        start: {
            type: Date,
            required: true
        },
        end: {
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
        group: {
            type: String,
            required: false
        },
        cost: {
            type: Number,
            required: true
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    });

module.exports = Event;

