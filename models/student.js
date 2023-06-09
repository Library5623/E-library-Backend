const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    studentName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    contactNumber: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    transactionCount: {
        type: mongoose.Schema.Types.String,
    },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
