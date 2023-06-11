//All user routes comes here
const dotenv = require("dotenv");

dotenv.config();
const {
    getDetails
} = require("../controllers/dashboardController");

const router = require("express").Router();

router.get('/dashboard',getDetails)

module.exports = (app) => {
    app.use('/library', router);
}
