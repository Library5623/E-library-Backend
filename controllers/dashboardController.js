const Student = require("../models/student");
const Book = require("../models/book");
const Counter = require("../models/counters");
const Transaction = require("../models/transaction");


//Returns total current registered students, total available distinct books, and total transactions made along with last 5 transactions
const getDetails = async (req, res) => {
    try {
        const studentCount = await Student.find();
        const transactionCount = await Counter.findOne({ idName: "Transaction" });
        const bookCount = await Book.find();
        if (studentCount && transactionCount && bookCount) {
            var transactionCounter = parseInt(transactionCount.value);
            var transactions = [];
            for (var i = transactionCounter; i > transactionCounter - 5; i--) {
                if (i != 0) {
                    await Transaction.findOne({ transactionId: i }).then((transaction) => {
                        transactions.push(transaction);
                    }).catch((error) => {
                        return res.status(400).json({
                            message: "Transaction not found",
                            error: error
                        });
                    })
                } else {
                    break;
                }
            }
            return res.status(200).json({
                message: "Details Fetched",
                studentCount: studentCount.length,
                bookCount: bookCount.length,
                transactionCount: transactionCounter,
                transactions: transactions
            });
        } else {
            return res.status(400).json({
                message: "Error in fetching",
                studentCount: studentCount.length,
                bookCount: bookCount.length,
                transactionCount: transactionCount.value
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong",
        });
    }
}


module.exports = { getDetails };