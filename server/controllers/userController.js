const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');

const generateJwt = (id, email, role) => {
	return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
	async registration(req, res, next) {
		try {
			const { email, password, role } = req.body;
			if (!email || !password) {
				return next(ApiError.badRequest('Некорректный email или password'));
			}
			const candidate = await User.findOne({ where: { email } });
			if (candidate) {
				return next(ApiError.badRequest('Пользователь с таким email уже существует'));
			}
			const hasPassword = await bcrypt.hash(password, 5); // хеширование пароля
			const user = await User.create({ email, role, password: hasPassword }); // создание пользователя
			const basket = await Basket.create({ userId: user.id }); // создаем корзину пользователя
			const token = generateJwt(user.id, user.email, user.role);
			return res.json({ token });
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return next(ApiError.internal('Пользователь не найден'));
			}
			let comparePassword = bcrypt.compareSync(password, user.password);
			if (!comparePassword) {
				return next(ApiError.internal('Указан неверный пароль'));
			}
			const token = generateJwt(user.id, user.email, user.role);
			return res.json({ token });
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	// Сгенерировать новый токен и отправить на клиент
	async check(req, res, next) {
		try {
			const token = generateJwt(req.user.id, req.user.email, req.user.role);
			return res.json({ token });
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}
}

module.exports = new UserController();
