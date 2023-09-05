const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');
const { types } = require('pg');

class TypeController {
	async create(req, res, next) {
		try {
			const { name } = req.body;
			const type = await Type.create({ name });
			return res.json(type);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res, next) {
		try {
			const types = await Type.findAll(); // находим все типы
			return res.json(types); // выводим все типы
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}
}

module.exports = new TypeController();