const mongoose = require("mongoose");
const Event = mongoose.model(
    "Event",
    {
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: false
        },
        start: {
            type: Date,
            required: false
        },
        end: {
            type: Date,
            required: false
        },
        maxParticipants: {
            type: Number,
            required: false
        },
        preSale: {
            type: Boolean,
            required: false
        },
        preSaleInfo: {
            type: String,
            required: false
        },
        published: {
            type: Boolean,
            required: false
        },
        cost: {
            type: Number,
            required: false
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

