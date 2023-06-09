const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
    idName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    value: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
