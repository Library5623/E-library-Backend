const Book = require("../models/book");
const dotenv = require("dotenv");
const Admin = require("../models/admin");

dotenv.config();

// Provide the book details as json object 
const addBook = async (req, res) => {
  var { bookCode, bookName, bookImage, bookAuthor, description, quantity } =
    req.body;
  try {
    const book = await Book.findOne({
      bookCode: bookCode,
    });
    //If database has the book already stored it will update the existing bookk with the new details and quantity (works similar to the update function) 
    if (book) {
      var bookQuantity = parseInt(book.quantity);
      var newQuantity = parseInt(quantity);
      bookQuantity = bookQuantity + newQuantity;
      await Book.findByIdAndUpdate(book._id, {
        $set: {
          bookCode: book.bookCode,
          bookName: bookName,
          bookImage: bookImage,
          bookAuthor: bookAuthor,
          description: description,
          quantity: bookQuantity < 0 ? "0" : bookQuantity.toString(),
        },
      });
      return res.status(200).json({
        message: "Book details updated",
        book: {
          bookCode: book.bookCode,
          bookName: bookName,
          bookImage: bookImage,
          bookAuthor: bookAuthor,
          description: description,
          quantity: bookQuantity < 0 ? "0" : bookQuantity.toString(),
        },
      });
    } else {
      //Add new book document in the database as its a new book
      if (
        bookCode &&
        bookName &&
        bookImage &&
        bookAuthor &&
        description &&
        quantity
      ) {
        Book.create({
          bookCode: bookCode,
          bookName: bookName,
          bookImage: bookImage,
          bookAuthor: bookAuthor,
          description: description,
          quantity: quantity,
        })
          .then((book) => {
            return res.status(200).json({
              message: "Book Added Succesfully",
              book: book,
            });
          })
          .catch((err) => {
            return res.status(400).json({
              message: "Error in book addition",
              error: err,
            });
          });
      } else {
        return res.status(400).json({
          message: "Provide All Required Inputs",
        });
      }
    }
  } catch (err) {
    return res.status(400).json({
      message: "Error in book addition",
      error: err,
    });
  }
};

//Pass the bookcode and admin password to remove a book from the database 
const removeBook = async (req, res) => {
  const { bookCode, password } = req.query;
  const { authorization } = req.headers;
  const email = authorization.split(" ")[1];
  try {
    const book = await Book.findOne({
      bookCode: bookCode,
    }).then(async (book) => {
      const admin = await Admin.findOne({ email: email });
      if (admin.password == password) {
        Book.findByIdAndDelete(book._id, {}).then(() => {
          return res.status(200).json({
            message: "Book Removed",
          });
        });
      } else {
        return res.status(400).json({
          message: "Wrong Admin Credentials",
        });
      }
    }).catch((err) => {
      return res.status(400).json({
        message: "Unable to find the book",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

//Returns a List of all the books prresent in the database
const getBooks = async (req, res) => {
  await Book.find()
    .then((book) => {
      return res.status(200).json({
        message: "Books fetched succesfully",
        books: book,
      });
    })
    .catch(() => {
      return res.status(400).json({
        message: "Unable to fetch books",
      });
    });
};

module.exports = { addBook, removeBook, getBooks };
