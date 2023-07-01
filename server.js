const express = require("express");
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const jwt = require('jsonwebtoken');
const { verification } = require("./middleware/verification");

dotenv.config();
// Access the port Number
port = process.env.PORT || 5000;

// Database url
const dataBaseString = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());

//middleware to check is the request is valid [Correct API_KEY, Token, Admin]
app.use(verification);

//log to display running of server 
app.listen(port, function () {
    console.log("App Started at port " + port)
});

//log to check mongodb connection and and start the actual routing in the app
mongoose.connect(dataBaseString).then(function () {
    console.log("Connected To MongoDB");
    routes(app);
});

