import { makeAutoObservable } from 'mobx';

export default class BasketStore {
	constructor() {
		this._basketId = null;
		this._basket_devices = [];

		makeAutoObservable(this);
	}

	setBasketId(basketId) {
		this._basketId = basketId;
	}

	setBasketDevices(basket_devices) {
		this._basket_devices = basket_devices;
	}

	updateBasketDevicesById(id, quantity) {
		const deviceForUpdate = this._basket_devices.find(device => device.deviceId === id);
		deviceForUpdate.quantity = quantity;
	}

	deleteFromBasketDevicesById(id) {
		this._basket_devices = this._basket_devices.filter(device => device.deviceId !== id);
	}

	get basketId() {
		return this._basketId;
	}

	get basketDevices() {
		return this._basket_devices;
	}
}