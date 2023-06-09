//All user routes comes here
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const {
    login,
    changePassword,
    all
} = require("../controllers/adminController");

const router = require("express").Router();

router.post('/login', login)
router.put('/password', changePassword)
router.get('/all', all);

module.exports = (app) => {
    app.use('/library', router);
}
