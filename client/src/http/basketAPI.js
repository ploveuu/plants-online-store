import { $authHost } from './index';

export const fetchBasket = async userId => {
	const { data } = await $authHost.get('api/basket', {
		params: { userId },
	});

	return data.id;
};

export const createBasketDevice = async basketDevice => {
	const { data } = await $authHost.post('api/basketPlants', basketDevice);
	return data;
};

export const fetchBasketDevices = async basketId => {
	const { data } = await $authHost.get('api/basketPlants', {
		params: {
			basketId,
		},
	});

	return data;
};

export const deleteBasketDevice = async (deviceId, basketId) => {
	const { data } = await $authHost.delete('api/basketPlants', {
		data: {
			deviceId,
			basketId,
		},
	});

	return data;
};

export const increaseBasketDevice = async (deviceId, basketId) => {
	const { data } = await $authHost.put('api/basketPlants/increase', {
		deviceId: deviceId,
		basketId: basketId,
	});

	return data;
};

export const decreaseBasketDevice = async (deviceId, basketId) => {
	const { data } = await $authHost.put('api/basketPlants/decrease', {
		deviceId: deviceId,
		basketId: basketId,
	});

	return data;
};