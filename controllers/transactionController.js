const Student = require("../models/student");
const Counter = require("../models/counters");
const Transaction = require("../models/transaction");
const Book = require("../models/book");
const dotenv = require("dotenv");
dotenv.config();

const addRecord = async (req, res) => {
    var { studentId, bookCode, borrowedDate } = req.query;
    try {
        await Student.findOne({
            id: studentId
        }).then(async (student) => {
            if(student.unreturnedBooks == "0"){
                await Book.findOne({
                    bookCode: bookCode
                }).then(async (book) => {
    
                    if (book.quantity > 0) {
                        const transactionId = await Counter.findOne({ idName: "Transaction" });
                        var count = parseInt(transactionId.value);
                        count++;
                        const transaction = await Transaction.create({
                            transactionId: count.toString(),
                            studentId: studentId,
                            bookCode: bookCode,
                            bookName: book.bookName,
                            studentName: student.studentName,
                            borrowedDate:borrowedDate,
                            returnedDate:"",
                            status: "return",
                        });
                        if (transaction) {
                            var quantity = parseInt(book.quantity);
                            quantity--;
                            await Book.findByIdAndUpdate(book._id, {
                                $set: { quantity: quantity.toString() }
                            });
                            await Counter.findByIdAndUpdate(transactionId._id, { $set: { value: count.toString() } });
                            var studentTransaction = parseInt(student.transactionCount);
                            studentTransaction++;
                            await Student.findByIdAndUpdate(student._id, {
                                $set: { 
                                    transactionCount: studentTransaction.toString(),
                                    unreturnedBooks:"1",
                                 }
                            });
                            return res.status(200).json({
                                message: "Transaction Added",
                                transaction: transaction,
                            });
                        } else {
                            return res.status(400).json({
                                message: "Error in Transaction",
                            });
                        }
    
                    } else {
                        return res.status(400).json({
                            message: "Book insufficient",
                        });
                    }
    
                }).catch((error) => {
                    return res.status(400).json({
                        message: "Book not found",
                    });
                })
            }else{
                return res.status(400).json({
                    message: "Cannot allot due to unreturned book",
                }); 
            }
            
        }).catch((error) => {
            return res.status(400).json({
                message: "Student ID not found",
            });
        })

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }

}

const updateTransaction = async (req, res) => {
    var { transactionId, returnedDate } = req.query;
    try {
        await Transaction.findOne({
            transactionId: transactionId
        }).then(async (transaction) => {
            if(transaction.status=="return"){
            await Transaction.findByIdAndUpdate(transaction._id, {
                $set: { 
                    status: "returned",
                    returnedDate:returnedDate,
                 }
            }).then(async () => {
                const student = await Student.findOne({id:transaction.studentId});
                await Student.findByIdAndUpdate(student._id,{
                    $set: { 
                        unreturnedBooks:"0",
                     }
                });
                await Book.findOne({ bookCode: transaction.bookCode }).then(async (book) => {
                    var quantity = parseInt(book.quantity);
                    quantity++;
                    await Book.findByIdAndUpdate(book._id, {
                        $set: { quantity: quantity.toString() }
                    }).then(() => {
                        return res.status(200).json({
                            message: "Transaction updated",
                        });
                    });
                }).catch((error) => {
                    return res.status(200).json({
                        message: "Book not available and transaction updated",
                    });
                })
            }).catch((error) => {
                return res.status(400).json({
                    message: "Error in Returning",
                });
            })
        }else{
            return res.status(200).json({
                message: "Cannot return the book as it is already returned",
            });
        }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Transaction doesnt exist",
        });

    }
}

const getTransactions = async (req, res) => {
    var { status } = req.query;
    try {

        var transactions = await Transaction.find({
            status: status
        })
        return res.status(200).json({
            message: "Transaction fetched",
            transactions: transactions,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
        });
    }
}




module.exports = { addRecord, updateTransaction, getTransactions};