const { Basket } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
	async getOne(req, res, next) {
		try {
			const { userId } = req.query; // в гет запросе - парамс

			const basket = await Basket.findOne({
				where: { userId },
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});

			return res.json(basket);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}
}

module.exports = new BasketController();