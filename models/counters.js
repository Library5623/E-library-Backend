const mongoose = require("mongoose");

//Counter record format used to generate id for student and transaction
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
