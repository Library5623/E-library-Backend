const mongoose = require("mongoose");

//Book record format
const bookSchema = new mongoose.Schema({
    bookCode: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    bookName: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    bookImage: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    bookAuthor: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    quantity: {
        type: mongoose.Schema.Types.String,
        required:true
    },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
