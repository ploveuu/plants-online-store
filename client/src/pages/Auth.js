// регистрация и авторизация
import React, { useContext } from 'react';
import { Card, Form, Container, FormControl, Button, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; // хук useLocation - получить маршрут в строке запроса
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { registration, login } from '../http/userAPI';
import { useState } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';

const Auth = observer(() => {
	const { user } = useContext(Context);

	const location = useLocation();
	const navigate = useNavigate();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const click = async () => {
		try {
			let data;
			if (isLogin) {
				data = await login(email, password);
			} else {
				data = await registration(email, password);
			}
			user.setUser(data);
			user.setIsAuth(true);

			navigate(SHOP_ROUTE);
		} catch (e) {
			alert(e.response.data.message);
		}
	};

	return (
		<Container className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight - 100 }}>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
				<Form className='d-flex flex-column'>
					<FormControl
						className='mt-3'
						placeholder='Ввведите ваш email...'
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<FormControl
						className='mt-3'
						placeholder='Ввведите ваш пароль...'
						value={password}
						onChange={e => setPassword(e.target.value)}
						type='password'
					/>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginTop: '3%',
						}}>
						{isLogin ? (
							<div>
								Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
							</div>
						) : (
							<div>
								Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
							</div>
						)}
						<Button variant={'outline-success'} onClick={click}>
							{isLogin ? 'Войти' : 'Регистрация'}
						</Button>
					</div>
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;