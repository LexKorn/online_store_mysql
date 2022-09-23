import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Col, Spinner} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import TypeBar from '../components/TypeBar';
import {Context} from '../index';
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI';
import Pages from '../components/Pages';


const ShopPage = observer(() => {
    const {device} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevices(null, null, 1, 8).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        }).finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 8).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        }).finally(() => setLoading(false));
    }, [device.page, device.selectedType, device.selectedBrand]);

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    {loading ? <Spinner animation={"border"}/> : <DeviceList/>}
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default ShopPage;