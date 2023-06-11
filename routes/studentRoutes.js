//All user routes comes here
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const {
    registerStudent,
    updateStudent,
    removeStudent,
    getStudents,
    getTotalStudents
} = require("../controllers/studentController");

const router = require("express").Router();

router.post('/student', registerStudent)
router.put('/student', updateStudent)
router.delete('/student', removeStudent)
router.get('/student',getStudents)
router.get('/studentCount',getTotalStudents)

module.exports = (app) => {
    app.use('/library', router);
}
