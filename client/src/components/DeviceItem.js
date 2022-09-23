import React, {useEffect, useContext} from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

import star from '../assets/star.png';
import { DEVICE_ROUTE } from '../utils/consts';
import { fetchBrands } from '../http/deviceAPI';
import {Context} from '../index';


const DeviceItem = ({device}) => {
    const history = useHistory();
    const {device: dev} = useContext(Context);

    useEffect(() => {
        fetchBrands().then(data => dev.setBrands(data));
    }, []);

    const brand = dev.brands.filter(brand => brand.id === device.brandId);


    return (
        <Col md={3} className="mt-3 mb-4" onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={'light'} className="shadow">
                <Image width={150} height={150} style={{objectFit:'contain'}} src={process.env.REACT_APP_API_URL + device.img} />
                <div className="d-flex text-black-50 mt-1 justify-content-around align-items-center">
                    <div>{brand[0].name}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div style={{'textAlign': 'center'}}>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;