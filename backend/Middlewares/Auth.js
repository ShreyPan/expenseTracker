const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({
            message: "Unauthorized, jtw token required"
        });
    }

    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { _id: decoded._id || decoded.userId || decoded.id };
        next();
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized, jwt token expired or wrong"
        });
    }
}

module.exports = ensureAuthenticated;