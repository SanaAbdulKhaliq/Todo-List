const jwt = require('jsonwebtoken');
const User = require('../modals/userModel');


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({error: 'No token, authorization denied'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Token is not valid'})
    }
}

module.exports = auth;