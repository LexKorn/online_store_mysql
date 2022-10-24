import React, { useContext } from 'react';
import {observer} from 'mobx-react-lite';
import {Card} from 'react-bootstrap';

import {Context} from '../index';

import './brandBar.sass';


const BrandBar = observer(() => {
    const {device} = useContext(Context);

    return (
        <div className="brand-bar">
            <Card 
                className="brand-bar__card"
                onClick={() => device.setSelectedBrand({})}
                border="light"
                >All                
            </Card>
            {device.brands.map(brand => 
                <Card 
                    key={brand.id} 
                    className="brand-bar__card"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    >{brand.name}
                </Card>
            )}
        </div>
    );
});

export default BrandBar;