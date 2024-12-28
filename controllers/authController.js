// import jwt
const jwt = require('jsonwebtoken');

// Generate jwt tokens
exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};


// middleware function to protect route
exports.protectRoute = (req, res, next) => {

    // Extract token from 'Authorization Header'  (Bearer token format)

    // Authorization: Bearer abc123xyz456
    // Authorization is the header name.
    // Bearer is the type of token being used.
    // abc123xyz456 is the actual token(an encoded string, typically a JWT token in the case of modern web apps).

    const token = req.headers.authorization?.split(' ')[1];

    console.log('token -> ', token);
    // authorization? ----> optional chaining , if authorization is null

    if (!token) {
        return res.status(401).json({ message: 'No token !' });
    }
    console.log('token', token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token !' });
        }
        // Attach user id to request object
        // like roles , mail , id for routes
        req.user = decoded;
        next();
    });

    // verify the token using the jwt secret key
    // What is decoded ?
    //     jwt.verify(token, secret, callback) :
    //     This method is used to verify and decode a JWT token.
    //     It checks if the token is valid(not tampered with, correctly signed, and not expired).
    //     If the token is valid, the payload of the token is returned to the callback function in
    //     the decoded parameter.The payload contains information encoded into the JWT, like the
    //     user’s ID, roles, permissions, etc.
}