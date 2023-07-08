const mongoose = require("mongoose");

//Admin record format
const adminSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
