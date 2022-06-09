const mongoose = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: String,
            required: false
        },
        street: {
            type: String,
            required: false
        },
        streetNumber: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        zip: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        events: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event"
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        },
    })
);
module.exports = User;
