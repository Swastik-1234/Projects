const jwt = require('jsonwebtoken');

const generateToken = (uemail, uid) => {
    const token = jwt.sign({ uemail, uid }, process.env.JWT_SECRET, { expiresIn: '30d' });
    return token;
}

module.exports = { generateToken };