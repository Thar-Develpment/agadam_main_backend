const jwt = require('jsonwebtoken');
const config = require('../config/config')

exports.generateJwtToken = (user) => {
    const payload = { id: user.id, email: user.email, subdomain: user.subdomain };

    return jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: '1d',
    });
}

exports.authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: 0, message: 'Unauthorized.' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ status: 0, message: 'Invalid or expired token.' });
    }
}