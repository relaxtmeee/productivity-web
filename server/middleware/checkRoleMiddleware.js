const jwt = require('jsonwebtoken');
const { decode } = require('punycode');

module.exports = function (role) {

    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            console.log(req.headers.authorization);
            const token = req.headers.authorization.split(' ')[1]; // Bearer aahqrtheqgr
            if (!token) {
                return res.status(401).json({message: 'Пользователь не авторизован'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decode.role !== role) {
                return res.status(403).json({message: 'Нет доступа'})
            }
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({message: 'Пользователь не авторизован'})
        }
    }
}