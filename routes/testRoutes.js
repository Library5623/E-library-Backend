// Testing routes for checking the app status

const router = require("express").Router();
const { testController } = require('../controllers/testController');

router.get('/home', testHome);

module.exports = (app) => {
    app.use('/library', router);
}
