import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import CRUDBrand from '../components/modals/CRUDBrand';
import CRUDDevice from '../components/modals/CRUDDevice';
import CRUDType from '../components/modals/CRUDType';


const AdminPage = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [brandVisible, setBrandVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <Container className="d-flex flex-column">
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
                >
                ТИП - добавить / удалить
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
                >
                БРЕНД - добавить / удалить
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
                >
                УСТРОЙСТВО - добавить / обновить / удалить
            </Button>
            <CRUDType show={typeVisible} onHide={() => setTypeVisible(false)} />            
            <CRUDBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CRUDDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
        </Container>
    );
};

export default AdminPage;