// проверка роли (добавить новое устройство может именно администратор)
const jwt = require('jsonwebtoken')

// принимает параметром роль
module.exports = function(role) {
    return function (req, res, next) { // функция возвращает authMiddleware
        if (req.metod === "OPTIONS") { // если не POST, GET, PUT, DELETE
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer  (тип токена bearer - токен)
            if (!token) {
                res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY) // проверка на валидность
            // отличие. после декодирования токена берем роль пользователя и сравниваем ее с ролью, переданной в middleware.
            // если они не совпадают - нет доступа
            if (decoded.role !== role) {
                res.status(403).json({message: "Нет доступа"})
            }
            req.user = decoded
            next() // следующий middleware
        } catch (e) {
            //alert(e.message)
            res.status(401).json({message: 'Не авторизован!!!!'})
        }
    }
}