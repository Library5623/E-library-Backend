const mongoose = require("mongoose");

//Transaction record format
const transactionSchema = new mongoose.Schema({
    transactionId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    bookCode: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    bookName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    studentId:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
    studentName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    status:{
        type: mongoose.Schema.Types.String,
        enum:["return", "returned"],
        required: true,
    },
    borrowedDate: {
        type: mongoose.Schema.Types.String,
    },
    returnedDate: {
        type: mongoose.Schema.Types.String,
    }

});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
