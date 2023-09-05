import { observer } from "mobx-react-lite";
import React, {useContext} from "react"
import { Context } from "../index";
import { Form } from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Form>
      {['radio'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
            {device.brands.map(brand => 
                <Form.Check 
                    name="brand-radio"
                    type={type}
                    inline
                    id={`inline-${type}-1`}
                    label={brand.name} 
                    key={brand.id} 
                    onClick={() => device.setSelectedBrand(brand)} 
                    active={brand.id === device.selectedBrand.id}
                />
            )}
        </div>
      ))}
    </Form>
    );
});

export default BrandBar;