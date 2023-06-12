const Book = require("../models/book");
const dotenv = require("dotenv");
const Admin = require("../models/admin");

dotenv.config();

const addBook = async (req, res) => {
  var { bookCode, bookName, bookImage, bookAuthor, description, quantity } =
    req.body;
  try {
    const book = await Book.findOne({
      bookCode: bookCode,
    });
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
          quantity: bookQuantity < 0? "0": bookQuantity.toString(),
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
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getBooks = async (req, res) => {
  await Book.find()
    .then((book) => {
      return res.status(200).json({
        message: "Books fetched succesfully",
        count: book,
      });
    })
    .catch(() => {
      return res.status(400).json({
        message: "Unable to fetch books",
      });
    });
};

module.exports = { addBook, removeBook, getBooks};
