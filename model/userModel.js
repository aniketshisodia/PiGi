const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please tell your name"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    role: {
        type: String,
        enum: ['student', 'pg-owner'],
        default: 'student'
    },
    password: {
        type: String,
        required: [true, 'Enter Password']
    },
    passwordConfirm: {
        type: String,
        validate: {
            validator: function (el) {
                return el === this.password;
            }
        }
    }
});


// ********************************************************************************************* //
// this middleware runs before data is saved to database
userSchema.pre('save', async function (next) {
    // if we have not modified or entered a password , then go to next middleware function
    if (!this.isModified('password')) {
        return next();
    }
    // hash the password
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});
// ********************************************************************************************* //


module.exports = mongoose.model('User', userSchema);