//All admin routes (api request)
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const {
    login,
    chechAdmin
} = require("../controllers/adminController");

const router = require("express").Router();

router.get('/login', login)
router.get('/check',chechAdmin)

module.exports = (app) => {
    app.use('/library', router);
}
