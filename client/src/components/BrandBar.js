import React, { useContext } from 'react';
import {observer} from 'mobx-react-lite';
import {Card} from 'react-bootstrap';

import {Context} from '../index';


const BrandBar = observer(() => {
    const {device} = useContext(Context);

    return (
        <div className="d-flex">
            <Card 
                className="p-3 ms-3 mt-3"
                onClick={() => device.setSelectedBrand({})}
                border="light"
                style={{cursor: 'pointer'}}>
                All                
            </Card>
            {device.brands.map(brand => 
                <Card 
                    key={brand.id} 
                    className="p-3 ms-3 mt-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    style={{cursor: 'pointer'}}>
                    {brand.name}
                </Card>
            )}
        </div>
    );
});

export default BrandBar;