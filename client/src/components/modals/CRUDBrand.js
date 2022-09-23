import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Modal, Button, Form} from 'react-bootstrap';

import {createBrand, deleteBrand} from '../../http/deviceAPI';
import { SHOP_ROUTE } from '../../utils/consts';


const CRUDBrand = ({show, onHide}) => {
    const [value, setValue] = useState('');
    const history = useHistory();

    const addBrand = () => {
        createBrand({name: value})
            .then(data => {
                setValue('');
                onHide();
                history.push(SHOP_ROUTE);
            })
            .catch(err => alert(err.response.data.message));       
    };

    const removeBrand = () => {
        deleteBrand(value).then(data => {
            setValue('');
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
                    Выберите действие с брендом
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название бренда"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-secondary "} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addBrand}>Добавить</Button>
                <Button variant={"outline-danger"} onClick={removeBrand}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CRUDBrand;