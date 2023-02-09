import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { parseDataIntoProducts } from "../DTO/ProductFactory";


class AddProduct extends React.Component {
    constructor(props) {
        super();
        this.state =
        {
            productsSKUs: null,
            formValidated: false,
            invalidSKU: true,
            productType: null
        }; // Products will be fetched to verify that new product's sku is unique

        this.createSKUArray = this.createSKUArray.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
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

    onFormSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault(); e.stopPropagation();
        }
        this.setState({ formValidated: true });
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
                                    type="text"
                                    onChange={(e) => this.setState({ invalidSKU: (this.state.productsSKUs.includes(e.target.value) || e.target.value === '') })}
                                    isInvalid={this.state.invalidSKU}
                                    isValid={!this.state.invalidSKU}
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
                                    type="text"
                                />
                                <Form.Control.Feedback type="invalid">Name must <b>not be empty</b></Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mt-5 mb-4">
                            <Form.Label column md={{ span: 2, offset: 1 }}>Product type</Form.Label>
                            <Col md="4">
                                <Form.Select id="productType" onChange={(e) => this.setState({ productType: e.target.value })} >
                                    <option>Please select a product type</option>
                                    <option value="Book">Book</option>
                                    <option value="DVD">DVD</option>
                                    <option value="Furniture">Furniture</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Container><p className="h1">{this.state.productType}</p></Container>

                    </Container>
                </Form>
            </div>
        );
    }
}
export default withRouter(AddProduct); 