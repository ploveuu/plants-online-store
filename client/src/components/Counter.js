import React from 'react';
import { Button } from 'react-bootstrap';

const Counter = ({ decrease, increase }) => {
	return (
		<div className='counter' style={{ display: 'flex' }}>
			<Button onClick={decrease} style={{ height: '30px', width: '50px' }} variant='light' size='sm'>
				-
			</Button>
			<Button onClick={increase} style={{ height: '30px', width: '50px' }} variant='light' size='sm'>
				+
			</Button>
		</div>
	);
};

export default Counter;