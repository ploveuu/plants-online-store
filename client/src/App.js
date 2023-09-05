import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { check } from './http/userAPI';
import { fetchBasket } from './http/basketAPI';
import './styles/index.css';

const App = observer(() => {
	const { user, basket } = useContext(Context);
	const currentUser = user.user;

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		check()
			.then(data => {
				user.setUser(data);
				user.setIsAuth(true);
			})
			.catch(e => console.warn(e.response.data.message))
			.finally(() => setLoading(false));
	}, []);

	// подгрузить айди корзины когда в сторе появится пользователь
	useEffect(() => {
		if (!currentUser.id) return;
		fetchBasket(currentUser.id)
			.then(basketId => basket.setBasketId(basketId))
			.catch(e => console.warn(e.response.data.message));
	}, [currentUser]);

	if (loading) {
		return <Spinner animation={'grow'} />;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<AppRouter />
            <Footer />
		</BrowserRouter>
	);
});

export default App;