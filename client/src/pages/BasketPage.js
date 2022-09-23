import React, {useEffect, useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';

import {Context} from '../index';
import { getBasket, deleteFromBasket } from '../http/basketAPI';


const BasketPage = observer(() => {
    const {basket} = useContext(Context);

    useEffect(() => {
        getBasket().then(data => basket.setBaskets(data));
    }, []);

    const removeProduct = (event) => {
        deleteFromBasket(event).then(data => {
            getBasket().then(data => basket.setBaskets(data));
            // window.location.reload();
        });
    };

    let prices = 0;
    {basket.basket.map(price =>
        prices += Number(price.device.price)
    )}

    return (
        <Container className="d-flex flex-sm-column justify-content-center align-items-center mt-3">
            <h2 className="pb-2">Корзина</h2>
            <Card 
                className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2"
                bg="dark"
                text="white">
                <h3 className="pe-2">Итого:</h3>
                <h3 className="ps-2">{prices}<span className="font-weight-light ps-2">руб.</span></h3>
            </Card>

            {basket.basket.map(product =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2" key={product.id}>
                    <Row className="d-flex w-100">
                        <Col md={7}>
                            <div className="d-flex flex-row align-items-center">
                                <img src={process.env.REACT_APP_API_URL + product.device.img} width={50} />
                                <h2 className="ps-3">{product.device.name}</h2>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <h2 className="font-weight-light">{product.device.price} руб.</h2>
                            </div>
                        </Col>
                        <Col md={2} className="d-flex justify-content-end align-items-center">
                            <Button 
                                variant={"outline-danger"}
                                onClick={() => removeProduct(product.id)}
                                >Удалить
                            </Button>
                        </Col>
                    </Row>
                </Card>
            )}
        </Container>
    );
});

export default BasketPage;