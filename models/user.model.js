const mongoose = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        imageUrl: String,
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
