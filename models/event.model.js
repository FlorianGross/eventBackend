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
        maxParticipants: {
            type: Number,
            required: true
        },
        preSale: {
            type: Number,
            required: true
        },
        preSaleEvent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: false
        },
        published: {
            type: Boolean,
            required: true
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
        ],
        preorder: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        details: [
            {
                type: String,
                required: false
            },
        ],
        detailsInfo: [
            {
                type: String,
                required: false
            },
        ],
    });

module.exports = Event;

