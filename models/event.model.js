const mongoose = require("mongoose");
const Event = mongoose.model(
    "Event",
    {
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
            type: Boolean,
            required: true
        },
        preSaleInfo: {
            type: String,
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
        eventSpecials:
        {
            type: String,
            required: false
        },
        contactPerson:
        {
            type: String,
            required: false
        },
        contactPhoneNumber: {
            type: String,
            required: false
        },
        contactEmail: {
            type: String,
            required: false
        }
    });

module.exports = Event;

