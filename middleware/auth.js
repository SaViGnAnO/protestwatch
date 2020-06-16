const config = require('../config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');


    try {
        // Check for token
        if(!token) return res.status(401).json({ msg: 'Authorization required.' });

        // Verify token if it does exist
        const decoded = jwt.verify(token, config.jwtSecret);

        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token invalid.' });
    }
}

module.exports = auth;