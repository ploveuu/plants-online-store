import React from "react"
import { Button, Card, Col, Image } from "react-bootstrap";
import starOutline from "../assets/starOutline.png"
import {useNavigate} from "react-router-dom"
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    return (
        <Col md={3} className="mt-3" onClick={()=> navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border="light">    
                <div class="scale">
                    <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                </div>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{device.price} руб.</div>
                    
                    <div className="d-flex align-items-center">
                        <div class="p-1">{device.rating}</div>
                        <Image width={18} height={18} src={starOutline}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card> 
        </Col>
    );
};

export default DeviceItem;