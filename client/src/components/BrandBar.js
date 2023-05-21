import { observer } from "mobx-react-lite";
import React, {useContext} from "react"
import { Context } from "../index";
import { Card, Form } from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Form className="d-flex flex-row flex-wrap">
            {device.brands.map(brand =>
                <Card
                    style={{cursor: 'pointer'}}
                    key={brand.id}
                    className="p-3"    
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>    
            )}
        </Form>
    );
});

export default BrandBar;