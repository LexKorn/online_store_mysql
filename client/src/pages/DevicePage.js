import React, {useState, useEffect, useContext} from 'react';
import { Container, Col, Row, Image, Card, Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import bigStar from '../assets/bigStar.png';
import { fetchOneDevice, fetchBrands } from '../http/deviceAPI';
import { addToBasket } from '../http/basketAPI';
import {Context} from '../index';

import './devicePage.sass';


const DevicePage = () => {
    const [device, setDevice] = useState({info: []});
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const {device: dev} = useContext(Context);
    
    useEffect(() => {
        fetchBrands().then(data => dev.setBrands(data));
        fetchOneDevice(id)
            .then(data => setDevice(data))
            .finally(() => setLoading(false));
    }, []);

    const addDivToBask = () => {
        const formData = new FormData();
        formData.append('deviceId', id);
        addToBasket(formData).then(response => alert(`Товар ` + device.name + ` был добавлен в вашу корзину!`));
    };

    const brand = dev.brands.filter(brand => brand.id === device.brandId);

    if (loading) {
        return <Spinner animation={"border"}/>
    }

    return (
        <Container className="mt-3">
            <Row className="device">
                <Col md={4}>
                    <Image className="device__img" src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4}>
                    <Row  className="d-flex justify-content-center align-items-center device__center">
                        <h2 className="device__center__text">{device.name}</h2>
                        <h2 className="device__center__text">{brand[0].name}</h2>
                        <div 
                            className="d-flex align-items-center justify-content-center device__star">
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around device__card">
                        <h3>От: {device.price} руб.</h3>
                        <Button variant={"outline-dark"} onClick={addDivToBask} >Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>       
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'trasparent', padding: 10}} >
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>     
        </Container>
    );
};

export default DevicePage;