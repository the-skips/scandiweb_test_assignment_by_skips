import React from "react";
import { withRouter } from "react-router-dom";
import ProductBox from "../Components/ProductBox";
import { parseDataIntoProducts } from "../DTO/ProductFactory";

import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../SCSS/ProductList.scss"

class ProductList extends React.Component {
    constructor(props) {
        super();
        this.state = { products: null };

        this.createProducts = this.createProducts.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.showProducts = this.showProducts.bind(this);
    }

    componentDidMount() {
        fetch('https://scandiwebtestsitebyskips.000webhostapp.com/api/server.php', { method: 'GET' })
            .then((r) => { return r.text() })
            .then((json) => this.createProducts(json));

    }

    createProducts(json) {
        let productsArray = parseDataIntoProducts(json);
        this.setState({ products: productsArray });
    }

    handleDelete() {
        console.log("Delete was pressed");
    }

    showProducts() {
        if (this.state.products == null) {
            return (<div></div>);
        }
        else {
            return this.state.products.map((object, i) => { return <ProductBox product={object} key={i} /> });
        }
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleDelete}>
                    <Container fluid className="pb-2 mb-4 border-bottom border-3 border-secondary header">
                        <Row className="align-items-center g-5">
                            <Col><p className="text-center fw-bold fst-italic h1 text-primary">Product List</p></Col>
                            <Col xs="2"><Button variant="secondary" className="px-4 py-3" onClick={() => this.props.history.push('/add-product')}>Add Products</Button></Col>
                            <Col xs="2"><Button type="submit" variant="secondary" className="px-4 py-3">Mass Delete</Button></Col>
                        </Row>
                    </Container>
                    <Container fluid>
                        <Row className="justify-content-around g-5">
                            {this.showProducts()}
                        </Row>
                    </Container>
                </form>
            </div>
        );
    }
}
export default withRouter(ProductList);