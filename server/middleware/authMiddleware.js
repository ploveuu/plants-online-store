// Декодирование токена и проверка его на валидность
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.metod === "OPTIONS") { // если не POST, GET, PUT, DELETE
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer  (тип токена bearer - токен)
        if (!token) {
            res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY) // проверка на валидность
        req.user = decoded
        next() // следующий middleware
    } catch (e) {
        res.status(401).json({message: 'Не авторизован'})
    }
}