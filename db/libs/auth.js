const jwt = require('jsonwebtoken');
const secret = require('./env').secret;
const User = require('../models/user');

module.exports = async function ({ req }) {
    let token = null;
    let currentUser = null;

    token = req.header['authorization'];
    if (!token) { }
    const decodedInfo = jwt.verify(token, secret);
    if (token && decodedInfo) {
        currentUser = await User.findById(decodedInfo.id);
        if (!currentUser) { throw new Error('Ivalid token'); }
    }

    return {
        token,
        currentUser,
    };
}
