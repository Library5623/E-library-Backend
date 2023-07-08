const Admin = require("../models/admin");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
dotenv.config();


//Login into the system using the email and password provided in mongodb
const login = async (req, res) => {
    const { email, password } = req.query;
    Admin.findOne({ email: email })
        .then((admin) => {
            if (admin.password === password) {
                jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '86400s' }, (err, token) => {
                    if (err) {
                        res.status(400).json({
                            message: "Error in Creating token",
                            error: err
                        })
                    } else {
                        res.status(200).json({
                            message: "Admin loge-In Successful",
                            token: token
                        })
                    }
                });
            } else {
                res.status(400).json({
                    message: "Wrong Password",
                })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: "Admin Not Found" });
        })
}

const chechAdmin = async (req, res) => {
    return res.status(200).json({
        message: 'Valid Admin',
        validToken: true,
    })
}

module.exports = { login, chechAdmin };
