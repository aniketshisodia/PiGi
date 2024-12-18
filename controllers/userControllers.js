const User = require('../model/userModel');

exports.signUp = async (req, res) => {
    try {
        // destructuring object
        const { name, email, password, passwordConfirm } = req.body;

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
        const newUser = await User.create({ name, email, password, passwordConfirm });
        console.log("new user", newUser);
        res.status(200).json({
            status: 'success',
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