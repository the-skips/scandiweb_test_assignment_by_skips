import React from "react";
import {Row, Col, Form } from "react-bootstrap";

export default class ProductSpecificParameterForm extends React.Component {

    constructor(props) {
        super(props);
        this.getFormRows = this.getFormRows.bind(this);
    }

    getFormRows() {
        let name = []; let id = [];
        switch (this.props.productType) {
            case 'Book':
                name.push("Weight (KG)");
                id.push("weight");
                break;
            case 'DVD':
                name.push("Size (MB)");
                id.push("size");
                break;
            case 'Furniture':
                name.push("Height (CM)", "Width (CM)", "Length (CM)");
                id.push("height", "width", "length");
                break;
            default:
                return (<div></div>);
        }
        return (
            id.map((currElement, i) => {
                return (
                    <Form.Group as={Row} className="mb-3" key={i}>
                        <Form.Label column md={{ span: 2, offset: 1 }}>{name[i]}</Form.Label>
                        <Col md="4">
                            <Form.Control
                                required
                                id={id[i]}
                                type="text"
                            />
                            <Form.Control.Feedback type="invalid">Field must <b>not be empty</b></Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                );
            })
        );
    }

    render() {
        let rows = this.getFormRows();
        return (
            <div>
                {rows}
            </div>
        );
    }
}