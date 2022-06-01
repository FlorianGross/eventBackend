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
            type: String,
            required: true
        },
        ende: {
            type: String,
            required: true
        },
    });

module.exports = Event;

