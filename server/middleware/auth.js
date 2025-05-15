// dependencies
const jwt = require('jsonwebtoken');
require('dotenv').config();

// auth validation
const auth = (req, res, next) => {
    try {
        // get token id
        const { authorization } = req.headers;

        // validation check
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { name, img, email, id } = decoded;

        // info send back
        req.name = name;
        req.img = img;
        req.email = email;
        req.id = id;
        next();
    } catch {
        next('Auth err');
    }
};

// export
module.exports = auth;