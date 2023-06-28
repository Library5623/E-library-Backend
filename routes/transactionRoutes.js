//All transaction routes (api request)
const dotenv = require("dotenv");

dotenv.config();
const {
    addRecord,
    updateTransaction,
    getTransactions,
} = require("../controllers/transactionController");

const router = require("express").Router();

router.post('/transaction', addRecord)
router.put('/transaction', updateTransaction)
router.get('/transaction', getTransactions)

module.exports = (app) => {
    app.use('/library', router);
}
