import React from 'react';
import Container from 'react-bootstrap/Container'
import {Button} from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';
import { useState } from 'react';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className='d-flex flex-column' style={{alignItems: 'center', justifyContent: 'center', minHeight: 500}}>
            <Button
                //class="admin-button" 
                style={{width: '70%'}}
                variant='outline-dark' 
                className='mt-4 p-2'
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button 
                style={{width: '70%'}}
                variant='outline-dark' 
                className='mt-4 p-2'
                onClick={() => setBrandVisible(true)}
            >
                Добавить страну-производителя
            </Button>
            <Button 
                style={{width: '70%'}}
                variant='outline-dark' 
                className='mt-4 p-2'
                onClick={() => setDeviceVisible(true)}
            >
                Добавить растение
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>
    );
};

export default Admin;