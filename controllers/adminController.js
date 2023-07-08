const Admin = require("../models/admin");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
dotenv.config();


//Login into the system using the email and password provided in mongodb
const login = async (req, res) => {
    const { email, password } = req.query;
    Admin.findOne({ email: email })
        .then(async (admin) => {
            if (admin.isLogin === '0') {
                if (admin.password === password) {
                    await Admin.findByIdAndUpdate(admin._id, { $set: { isLogin: '1' } });
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
            } else {
                res.status(400).json({
                    message: "User Logged In On Other Device",
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
//Change of password by some security checks 
//Addition of checks remained
const logout = async (req, res) => {
    const { email } = req.query;
    Admin.findOneAndUpdate({ email: email, $set: { isLogin: '0' } }).then((admin) => {
        return res.status(200).json({
            message: 'Logged Out',
        })
    }).catch((err) => {
        return res.status(400).json({ message: "Admin not found" });
    })
}

//List all the admins in the database 

module.exports = { login, logout, chechAdmin };
