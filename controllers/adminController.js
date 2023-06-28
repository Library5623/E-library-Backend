const Admin = require("../models/admin");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
dotenv.config();


//Login into the system using the email and password provided in mongodb
const login = async (req, res, next) => {
    const { email, password } = req.query;
    Admin.findOne({ email: email })
        .then((admin) => {
            if (admin.password === password) {
                jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '8640000s' }, (err, token) => {
                    if (err) {
                        res.status(200).json({
                            message: "Error in Creating token",
                            error: err
                        })
                    } else {
                        res.statusCode = 200;
                        res.json({ message: "Admin loge-In Successful", admin: admin, token: token });
                    }
                });
            } else {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.json({ message: "Wrong Password", error: err });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: "Admin Not Found" });
        })
}

//Change of password by some security checks 
//Addition of checks remained
const changePassword = async (req, res) => {
    const { email, newPassword } = req.query;
    try {
        const admin = await Admin.findOne({ email: email });
        Admin.findOneAndUpdate(admin._id, {
            $set: { password: newPassword }
        })
            .then((admin) => {
                res.status(200).json({
                    message: "Password Updated Succesfully",
                    admin: admin
                })
            }).catch((e) => {
                res.status(400).json({
                    message: "Unable to Update Password",
                })
            });
    } catch (e) {
        res.status(400).json({
            message: "Admin Not Found",
        });
    }

}

//List all the admins in the database 
const all = async (req, res, next) => {
    Admin.find({})
        .then((admin) => {
            res.status(200).json({ admin: admin });
        })
        .catch((err) => { res.json({ message: err.message }) });
}

module.exports = { login, changePassword, all };
