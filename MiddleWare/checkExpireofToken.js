const jwt = require('jsonwebtoken');

const checkTokenExpired = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.secrate, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {

                next();
            } else {

                return res.status(401).json({ error: 'Invalid token' });
            }
        } else {
            return res.status(400).json({ error: 'Token is still valid' });
        }
    });
};

module.exports = { checkTokenExpired };
