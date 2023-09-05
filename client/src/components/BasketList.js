import React, { useEffect } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '..';
import { decreaseBasketDevice, deleteBasketDevice, fetchBasketDevices, increaseBasketDevice } from '../http/basketAPI';
import Counter from './Counter';

const BasketList = observer(() => {
	const { basket } = useContext(Context);
	const basketList = basket.basketDevices;
	const basketId = basket.basketId;

	const totalSum = basketList.reduce((sum, device) => (sum += device.price * device.quantity), 0);

	// подгрузить список
	useEffect(() => {
		if (!basketId) return;
		fetchBasketDevices(basketId)
			.then(data => basket.setBasketDevices(data))
			.catch(e => console.warn(e.response.data.message));
	}, [basketId]);

	// увеличить количество и обновить значение в базе
	const addOne = deviceId => {
		increaseBasketDevice(deviceId, basketId)
			.then(updated => basket.updateBasketDevicesById(updated.deviceId, updated.quantity))
			.catch(e => console.warn(e.response.data.message));
	};

	// уменьшить количество и обновить значение в базе
	const removeOne = deviceId => {
		decreaseBasketDevice(deviceId, basketId)
			.then(updated => {
				if (updated) {
					basket.updateBasketDevicesById(updated.deviceId, updated.quantity);
				} else {
					basket.deleteFromBasketDevicesById(deviceId);
				}
			})
			.catch(e => console.warn(e.response.data.message));
	};

	const removeCard = deviceId => {
		deleteBasketDevice(deviceId, basketId)
			.then(deleted => basket.deleteFromBasketDevicesById(deviceId))
			.catch(e => console.warn(e.response.data.message));
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', maxWidth: 800, minHeight: 600, margin: 'auto', paddingBottom: '30px'}}>
			{basketList.map(basketItem => (
				<React.Fragment key={basketItem.id}>
					<Card className='d-flex flex-row mt-3 p-3' style={{ width: '100%' }} border='red'>
						<div class="scale">
                            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + basketItem.img} />
                        </div>
                        
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								marginLeft: '1rem',
							}}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}>
								<b>{basketItem.name}</b>
								<span>Цена: <i>{basketItem.price}</i> руб.</span>
								<span>
									<span>Количество: </span>
									<i>{basketItem.quantity}</i>
								</span>

								<span>
									<span>Сумма: </span>
									<b style={{color: '#678C61'}}><i>{basketItem.price * basketItem.quantity}</i></b>
									<span> руб.</span>
								</span>
							</div>

							<Counter decrease={() => removeOne(basketItem.deviceId)} increase={() => addOne(basketItem.deviceId)} />
						</div>

						<Button
							onClick={() => removeCard(basketItem.deviceId)}
							style={{ marginLeft: 'auto', height: 'fit-content' }}
							variant='danger'
							size='sm'>
							Удалить
						</Button>
					</Card>
				</React.Fragment>
			))}

			<div
				style={{
					width: '100%',
					marginTop: 20,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'centers',
				}}>
				<span>
					<span>ИТОГО:</span> <span><b style={{color: '#678C61'}}>{totalSum}</b> руб.</span>
				</span>
				<Button style={{ marginLeft: 'auto', height: 'fit-content', width: 'fit-content' }} variant='outline-success'>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
});

export default BasketList;