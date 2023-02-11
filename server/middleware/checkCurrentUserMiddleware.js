const jwt = require('jsonwebtoken');

module.exports = function () {

    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1]; // Bearer aahqrtheqgr
            console.log(token);
            if (!token) {
                return res.status(401).json({message: 'Пользователь не авторизован'})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log('aregaertgqaetharthwrthjwrythqeahrbgfkvjqacg ecfjwuBEtruiyawefcuyawЕИПкалоцрпукслнцпивчлпцКШГн623   и7' + decoded.id, req.query.userId);
            if(decoded.id != req.query.userId) {
                
                return res.status(403).json({message: 'Нет доступа'})
            }
            next();
        } catch (error) {
            res.status(401).json({message: 'Пользователь не авторизован'})
        }
    }
}