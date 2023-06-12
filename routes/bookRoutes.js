const dotenv = require("dotenv");


dotenv.config();
const {
  addBook,
  removeBook,
  getBooks
} = require("../controllers/bookController");

const router = require("express").Router();

router.post('/book', addBook);
router.delete('/book', removeBook);
router.get('/book', getBooks);

module.exports = (app) => {
    app.use('/library', router);
}