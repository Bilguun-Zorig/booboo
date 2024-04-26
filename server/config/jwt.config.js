const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

module.exports = {
    authenticate: (req, res, next) => {
        // Check if the request contains a JWT token
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(req.cookies.userToken, secret, (err, payload) => {
            if (err) {
                res.status(401).json({ verified: false });
            } else {
                // If token is valid, attach the decoded user information to the request
                req.user = decodedToken;
                // req.user = payload;
                next();
            }
        });
    }

}