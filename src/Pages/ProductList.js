import React from "react";
import { withRouter } from "react-router-dom";
import ProductBox from "../Components/ProductBox";
import { parseDataIntoProducts } from "../DTO/ProductFactory";

import { Container, Row, Col, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../SCSS/ProductList.scss"

class ProductList extends React.Component {
    constructor(props) {
        super();
        this.state = { products: null, loading: true };

        this.askServerForProducts = this.askServerForProducts.bind(this);
        this.createProducts = this.createProducts.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.askServerForProducts();
    }

    askServerForProducts() {
        this.setState({ loading: true });
        fetch('https://scandiwebtestsitebyskips.000webhostapp.com/api/server.php', { method: 'GET' })
            .then((r) => { return r.text() })
            .then((json) => this.createProducts(json));
    }

    createProducts(json) {
        let productsArray = parseDataIntoProducts(json);
        this.setState({ products: productsArray, loading: false });
    }

    putFormDataIntoObject(formData) {
        let request = {
            'actionType': "deleteProducts"
        };
        let data = [];
        for (const key of formData.keys()) {
            data.push(JSON.parse(key));
        }
        request['products'] = data;
        return request;
    }

    handleDelete(e) {
        e.preventDefault(); e.stopPropagation();
        console.log(new FormData(e.currentTarget));
        let data = this.putFormDataIntoObject(new FormData(e.currentTarget));
        fetch("https://scandiwebtestsitebyskips.000webhostapp.com/api/server.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => this.askServerForProducts());
    }


    render() {
        let body;
        if (this.state.loading === true) {
            body = (
                <div className="d-flex justify-content-center mt-5">
                    <Spinner animation="border" variant="secondary" />
                </div>
            );
        }
        else if (this.state.products.length > 0) {
            body = (
                <Row className="justify-content-around g-5">
                    {this.state.products.map((object, i) => { return <ProductBox product={object} key={i} /> })}
                </Row>
            );
        }
        else {
            body = (
                <div className="text-center mt-5"><p className="h3 text-muted">No products available</p></div>
            );
        }
        return (
            <div>
                <form onSubmit={this.handleDelete}>
                    <Container fluid className="pb-2 mb-4 border-bottom border-3 border-secondary header">
                        <Row className="align-items-center g-5">
                            <Col><p className="text-center fw-bold fst-italic h1 text-primary">Product List</p></Col>
                            <Col xs="2"><Button variant="secondary" className="px-4 py-3" onClick={() => this.props.history.push('/add-product')}>ADD</Button></Col>
                            <Col xs="2"><Button type="submit" variant="secondary" className="px-4 py-3">MASS DELETE</Button></Col>
                        </Row>
                    </Container>
                    <Container fluid>
                        {body}
                    </Container>
                </form>
            </div>
        );
    }
}
export default withRouter(ProductList);