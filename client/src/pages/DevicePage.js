import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Col, Image, Row, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { createBasketDevice } from '../http/basketAPI';
import { Context } from '..';

const DevicePage = () => {
	const { basket } = useContext(Context);

	const [device, setDevice] = useState({ info: [] });
	const { id } = useParams();

	useEffect(() => {
		fetchOneDevice(id).then(data => setDevice(data));
	}, [id]);

	const toBasket = () => {
		createBasketDevice({
			deviceId: id,
			basketId: basket.basketId,
		}).catch(error => console.warn(error.message));
	};

	return (
		<Container className='mt-3' style={{ minHeight: 600}}>
			<Row className='mb-3'>
				<Col md={5}>
					<Image width={500} height={500} src={device.img ? process.env.REACT_APP_API_URL + device.img : ''} />
				</Col>
				<Col md={6}>
					<Row className='d-flex flex-column align-items-left m-3'>
						<div className='d-flex justify-content-left m-3'>
							<h1>{device.name}</h1>
						</div>
                        <Card
						    className='d-flex flex-column align-items-center justify-content-center m-3' 
						    style={{ width: 300, height: 120, fontSize: 32, border: '3px solid lightgray' }}>
						    <h3>От: {device.price} руб.</h3>
                            <Button onClick={toBasket} variant='outline-dark'>
                                Добавить в корзину
                            </Button>
					    </Card>
                        <Row className='d-flex flex-column m-3'>
                            <h2>Характеристики</h2>
                            {device.info.map((info, index) => (
                            <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                                {info.title}: {info.description}
                            </Row>
				            ))}
			            </Row>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default DevicePage;