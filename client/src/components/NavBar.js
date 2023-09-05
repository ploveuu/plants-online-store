import React, { useContext } from 'react';
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const NavBar = observer(() => {
	const { user } = useContext(Context);
	const navigate = useNavigate();

	const logOut = () => {
		user.setUser({});
		user.setIsAuth(false);
		localStorage.removeItem('token');
	};

	return (
		<Navbar variant='dark'>
			<Container>
                <div
					style={{
					    background: `url(${logo}) no-repeat center center`,
				    	width: 80,
			    		height: 80,
		    			backgroundSize: 'cover',
	    			}}>
				</div>
                <Navbar.Brand href="" onClick={() => navigate(SHOP_ROUTE)}>Парник</Navbar.Brand>
				{user.isAuth ? ( // если пользователь авторизован, отображаем первый блок. если нет - второй
					<Nav className='ml-auto' style={{ color: 'white' }}>
						<Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>
							Админ панель
						</Button>
						<Button variant={'outline-light'} onClick={() => navigate(BASKET_ROUTE)} className='mx-2'>
							Корзина
						</Button>
						<Button variant={'outline-light'} onClick={() => logOut()}>
							Выйти
						</Button>
					</Nav>
				) : (
					<Nav className='ml-auto' style={{ color: 'white' }}>
						<Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>
							Авторизация
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	);
});

export default NavBar;