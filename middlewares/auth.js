const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    let token = req.header('x-api-key');
    
    // בדיקה אם יש token בכלל
    if (!token) {
        return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }
    
    // הסרת "Bearer " אם קיים
    token = token.replace('Bearer ', '');
    
    try {
        let tokenData = jwt.verify(token, 'mormor_key');
        req.tokenData = tokenData;
        next();
    } catch (error) {
        return res.status(403).json({ msg: 'Access denied. Invalid token.' });
    }
}