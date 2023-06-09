const Admin = require("../models/admin");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
dotenv.config();

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
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.json({ message: "Wrong Password", error: err });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Admin Not Found" });
        })
}

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

const all = async (req, res, next) => {

    User.find({})
        .then((users) => {
            res.status(200).json({ users: users });
        })
        .catch((err) => { res.json({ message: err.message }) });
}

module.exports = { login, changePassword, all };
