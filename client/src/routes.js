// описание маршрутов к страницам

import Admin from './pages/Admin';
import Basket from './pages/Basket';
import Shop from './pages/Shop';
import Auth from './pages/Auth';
import Device from './pages/DevicePage';
import { ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './utils/consts';

export const authRoutes = [
	// массив для хранения маршрутов, к которым имеет доступ только авторизованный пользователь
	{
		path: ADMIN_ROUTE, // путь, по которой страница будет открыта
		Component: Admin, // сама страница
	},
	{
		path: BASKET_ROUTE,
		Component: Basket,
	},
];

export const publicRoutes = [
	// массив для хранения маршрутов, к которым имеет доступ любой пользователь
	{
		path: SHOP_ROUTE,
		Component: Shop,
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth,
	},
	{
		path: DEVICE_ROUTE + '/:id',
		Component: Device,
	},
];
