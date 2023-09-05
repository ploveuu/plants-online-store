const { BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketPlantsController {
	// CREATE
	async create(req, res, next) {
		try {
			const { deviceId, basketId } = req.body;

			const plantModel = await Device.findOne({
				where: {
					id: deviceId,
				},
			});

			let basketPlant = await BasketDevice.findOne({
				where: {
					deviceId: +deviceId,
					basketId: +basketId,
				},
			});

			if (basketPlant) {
				// обновить количество
				await BasketDevice.upsert({
					id: basketPlant.id,
					quantity: basketPlant.quantity + 1,
					basketId: basketPlant.basketId,
					deviceId: basketPlant.deviceId,
					name: basketPlant.name,
					price: basketPlant.price,
					img: basketPlant.img,
				});

				basketPlant = await BasketDevice.findOne({
					where: {
						deviceId: +deviceId,
						basketId: +basketId,
					},
				});
			} else {
				// добавить новое растение
				basketPlant = await BasketDevice.create({
					quantity: 1,
					basketId: +basketId,
					deviceId: +deviceId,
					name: plantModel.name,
					price: plantModel.price,
					img: plantModel.img,
				});
			}

			return res.json(basketPlant);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	// DELETE
	async delete(req, res, next) {
		try {
			const { deviceId, basketId } = req.body;

			await BasketDevice.destroy({
				where: {
					deviceId,
					basketId,
				},
			});

			return res.status(204).json();
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	// GET
	async getAll(req, res, next) {
		try {
			const { basketId } = req.query;

			const basketPlants = await BasketDevice.findAll({
				where: { basketId },
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});

			return res.json(basketPlants);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	// INCREASE
	async increase(req, res, next) {
		try {
			const { deviceId, basketId } = req.body;

			let increasedPlant = await BasketDevice.findOne({
				where: {
					deviceId,
					basketId,
				},
			});

			await BasketDevice.upsert({
				id: increasedPlant.id,
				quantity: increasedPlant.quantity + 1,
				basketId: increasedPlant.basketId,
				deviceId: increasedPlant.deviceId,
				name: increasedPlant.name,
				price: increasedPlant.price,
				img: increasedPlant.img,
			});

			increasedPlant = await BasketDevice.findOne({
				where: { deviceId, basketId },
				attributes: { exclude: ['createdAt', 'updatedAt'] },
			});

			return res.json(increasedPlant);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	// DECREASE
	async decrease(req, res, next) {
		try {
			const { deviceId, basketId } = req.body;

			let decreasedPlant = await BasketDevice.findOne({
				where: {
					deviceId,
					basketId,
				},
			});

			// удалить, если количество = 1
			if (decreasedPlant.quantity === 1) {
				await decreasedPlant.destroy();
				return res.status(204).json();
			} else {
				// иначе уменьшить на 1
				decreasedPlant = await BasketDevice.upsert({
					id: decreasedPlant.id,
					quantity: decreasedPlant.quantity - 1,
					basketId: decreasedPlant.basketId,
					deviceId: decreasedPlant.deviceId,
					name: decreasedPlant.name,
					price: decreasedPlant.price,
					img: decreasedPlant.img,
				});

				decreasedPlant = await BasketDevice.findOne({
					where: { deviceId, basketId },
					attributes: { exclude: ['createdAt', 'updatedAt'] },
				});

				return res.json(decreasedPlant);
			}
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}
}

module.exports = new BasketPlantsController();