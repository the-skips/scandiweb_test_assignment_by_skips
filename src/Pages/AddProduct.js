import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { parseDataIntoProducts } from "../DTO/ProductFactory";
import ProductSpecificParameterForm from "../Components/ProductSpecificParameterForm";


class AddProduct extends React.Component {
    constructor(props) {
        super();
        this.state =
        {
            productsSKUs: null,
            formValidated: false,
            invalidSKU: false,
            productType: null
        }; // Products will be fetched to verify that new product's sku is unique

        this.createSKUArray = this.createSKUArray.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.putFormDataIntoObject = this.putFormDataIntoObject.bind(this);
    }

    componentDidMount() {
        fetch('https://scandiwebtestsitebyskips.000webhostapp.com/api/server.php', { method: 'GET' })
            .then((r) => { return r.text() })
            .then((json) => this.createSKUArray(json));

    }
    createSKUArray(json) {
        let productsArray = parseDataIntoProducts(json);
        let skuArray = productsArray.map((product) => product.sku);
        this.setState({ productsSKUs: skuArray });
    }

    putFormDataIntoObject(formData) {
        let request = {
            'actionType': "addProducts"
        };
        let data = {
            'sku': formData.get("sku"),
            'name': formData.get("name"),
            'price': formData.get("price"),
        };
        switch (this.state.productType) {
            case 'Book':
                data['productType'] = 'book';
                data['weight'] = formData.get("weight");
                break;
            case 'DVD':
                data['productType'] = 'dvd';
                data['size'] = formData.get("size");
                break;
            case 'Furniture':
                data['productType'] = 'furniture';
                data['length'] = formData.get("length");
                data['width'] = formData.get("width");
                data['height'] = formData.get("height");
                break;
            default:
                break;
        }
        request['products'] = [data];
        return request;
    }

    onFormSubmit(e) {
        this.setState({ formValidated: true });
        const form = e.currentTarget;
        e.preventDefault(); e.stopPropagation();
        if (form.checkValidity() === false) {
            return;
        }
        let data = this.putFormDataIntoObject(new FormData(e.currentTarget));
        fetch("https://scandiwebtestsitebyskips.000webhostapp.com/api/server.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => this.props.history.push('/'));

    }


    render() {
        return (
            <div>
                <Form noValidate validated={this.state.formValidated} id="product_form" onSubmit={this.onFormSubmit}>
                    <Container fluid className="pb-2 mb-4 border-bottom border-3 border-secondary header">
                        <Row className="align-items-center g-5">
                            <Col><p className="text-center fw-bold fst-italic h1 text-primary">Product Add</p></Col>
                            <Col xs="2"><Button disabled={this.state.invalidSKU} type="submit" variant="secondary" className="px-4 py-3">Save</Button></Col>
                            <Col xs="2"><Button variant="secondary" className="px-4 py-3" onClick={() => this.props.history.push('/')}>Cancel</Button></Col>
                        </Row>
                    </Container>

                    <Container fluid className="mt-4 pt-2">
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={{ span: 2, offset: 1 }}>SKU</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    required
                                    id="sku"
                                    name="sku"
                                    type="text"
                                    onChange={(e) => this.setState({ invalidSKU: (this.state.productsSKUs.includes(e.target.value) || e.target.value === '') })}
                                    isInvalid={this.state.invalidSKU}
                                />
                                <Form.Control.Feedback type="invalid">SKU must <b>unique</b> and <b>not empty</b></Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={{ span: 2, offset: 1 }}>Name</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    required
                                    id="name"
                                    name="name"
                                    type="text"
                                />
                                <Form.Control.Feedback type="invalid">Name must <b>not be empty</b></Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={{ span: 2, offset: 1 }}>Price ($)</Form.Label>
                            <Col md="4">
                                <Form.Control
                                    required
                                    id="price"
                                    name="price"
                                    type="number"
                                />
                                <Form.Control.Feedback type="invalid">Name must <b>not be empty</b></Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mt-5 mb-3">
                            <Form.Label column md={{ span: 2, offset: 1 }}>Product type</Form.Label>
                            <Col md="4">
                                <Form.Select id="productType" required onChange={(e) => this.setState({ productType: e.target.value })} >
                                    <option value="">Please select a product type</option>
                                    <option value="Book">Book</option>
                                    <option value="DVD">DVD</option>
                                    <option value="Furniture">Furniture</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <ProductSpecificParameterForm productType={this.state.productType} />

                    </Container>
                </Form>
            </div>
        );
    }
}
export default withRouter(AddProduct); 