import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {Modal, Button, Form, Dropdown, Col, Row} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../../index';
import { fetchTypes, fetchBrands, createDevice, deleteDevice, updateDevice } from '../../http/deviceAPI';
import { SHOP_ROUTE } from '../../utils/consts';


const CRUDDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const history = useHistory();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);
    const [id, setId] = useState('');

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, []);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    };

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('typeId', device.selectedType.id);
        formData.append('info', JSON.stringify(info));

        createDevice(formData).then(data => {
            onHide();
            history.push(SHOP_ROUTE);
        });
    };

    const removeDevice = () => {
        deleteDevice(id).then(data => {
            onHide();
            history.push(SHOP_ROUTE);
        });
    };

    const editDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);

        updateDevice(id, formData).then(data => {
            onHide();
            history.push(SHOP_ROUTE);
        });
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Выберите действие с устройством
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <h5>Добавить новое устройство</h5>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type => 
                                <Dropdown.Item 
                                onClick={() => device.setSelectedType(type)} 
                                key={type.id} >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand => 
                                <Dropdown.Item 
                                onClick={() => device.setSelectedBrand(brand)} 
                                key={brand.id} >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu> 
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Введите название устройства"
                    />
                    <Form.Control
                        className="mt-3"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder="Введите стоимость устройства"
                        type="number"
                    />                     
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button 
                        variant="outline-dark"
                        onClick={addInfo}
                        >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <Form.Control 
                                    value={i.title}
                                    onChange={e => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control 
                                    value={i.description}
                                    onChange={e => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание"
                                />
                            </Col>
                            <Col md={4}>
                            <Button 
                                variant="outline-danger"
                                onClick={() => removeInfo(i.number)}
                                >
                                Удалить
                            </Button>
                            </Col>
                        </Row>    
                    )} 
                    <Form.Control
                        className="mt-3"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder={"Введите id для удаления или обновления устройства"}
                    />                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addDevice}>Добавить</Button>           
                <Button variant={"outline-danger"} onClick={editDevice}>Обновить</Button>     
                <Button variant={"outline-danger"} onClick={removeDevice}>Удалить</Button>   
            </Modal.Footer>
        </Modal>
    );
});

export default CRUDDevice;