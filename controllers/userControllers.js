const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const authcontroller = require('./authController');
// *******************************************************************************************//

// SIGNUP FUNCTIONALITY
exports.signUp = async (req, res) => {
    try {
        // destructuring object
        const { name, email, password, passwordConfirm, role } = req.body;

        console.log(req.body);

        // if a user exist from before then we should not let him doing signUp
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already exist. Please use different mail'
            });
        }
        // create new user
        const newUser = await User.create({ name, email, password, passwordConfirm, role });

        // generate token

        // ._id = unique id generated by mongoDB
        const token = authcontroller.generateToken(newUser._id);

        // console.log("new user", newUser);

        res.status(200).json({
            status: 'success',
            token,
            data: {
                name: newUser.name,
                email: newUser.email
            }
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

// *******************************************************************************************//

// *******************************************************************************************//

// LOGIN FUNCTIONALITY

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check is email and password exist
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provoide a valid mail'
            });
        }
        // find the user by email
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email or password'
            });
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid email or password'
            });
        }

        const token = authcontroller.generateToken(user._id);
        console.log('token login', token);
        // send response
        res.status(200).json({
            status: 'success',
            message: 'Login Successful',
            token,
            data: {
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            messgae: error.message
        });
    }
};

// *******************************************************************************************//
