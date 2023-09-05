import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import BasketList from '../components/BasketList';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
	return (
		<Container>
			<BasketList />
		</Container>
	);
});

export default Basket;