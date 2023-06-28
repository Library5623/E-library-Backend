const dotenv = require("dotenv");
//All book routes (api request)

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