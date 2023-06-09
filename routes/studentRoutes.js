//All user routes comes here
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const {
    registerStudent,
    updateStudent,
    removeStudent
} = require("../controllers/studentController");

const router = require("express").Router();

router.post('/student', registerStudent)
router.put('/student', updateStudent)
router.delete('/student', removeStudent)

module.exports = (app) => {
    app.use('/library', router);
}
