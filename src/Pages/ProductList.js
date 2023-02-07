import React from "react";
import NavigationButton from "../Components/NavigationButton";
import ProductBox from "../Components/ProductBox";
import { Book } from "../DTO/Book";
import { DVD } from "../DTO/DVD";
import { Furniture } from "../DTO/Furniture";

import { Container, Row, Col } from "react-bootstrap";
import "../SCSS/ProductList.scss"

class ProductList extends React.Component {
    constructor(props) {
        super();
        this.state = { products: null };
        this.parseDataIntoProducts = this.parseDataIntoProducts.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.showProducts = this.showProducts.bind(this);
    }

    componentDidMount() {
        fetch('https://scandiwebtestsitebyskips.000webhostapp.com/api/server.php', { method: 'GET' })
            .then((r) => { return r.text() })
            .then((json) => this.parseDataIntoProducts(json));

    }
    parseDataIntoProducts(json) {
        let productsArray = [];
        let data = JSON.parse(json);
        data.forEach(e => {
            switch (e.ProductType) {
                case 'book':
                    productsArray.push(new Book(e.SKU, e.Name, e.Price, e.WeightInKg));
                    break;
                case 'dvd':
                    productsArray.push(new DVD(e.SKU, e.Name, e.Price, e.SizeInMB));
                    break;
                case 'furniture':
                    productsArray.push(new Furniture(e.SKU, e.Name, e.Price, e.HeightInM, e.WidthInM, e.LengthInM));
                    break;
                default:
                    break;
            }
        });
        this.setState({ products: productsArray });
    }
    handleDelete() {
        console.log("Delete was pressed");
    }

    showProducts() {
        if (this.state.products == null) {
                return (<div></div>);
        } 
        else{
            return this.state.products.map((object, i) => { return <ProductBox product={object} key={i} /> });
        }
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleDelete}>
                    <Container fluid className="pb-2 mb-4 border-bottom border-3 border-secondary header">
                        <Row className="align-items-center">
                            <Col><p className="text-center fw-bold fst-italic h1 text-primary">Product List</p></Col>
                            <Col xs="2">{<NavigationButton {...this.props} to="/add-product" text="Add Products"/>}</Col>
                            <Col xs="2"><input type="submit" value="Mass Delete"/></Col>
                        </Row>
                    </Container>
                    <Container fluid className="px-5">
                        <Row className="justify-content-xs-around">
                            {this.showProducts()}
                        </Row>
                    </Container>
                </form>
            </div>
        );
    }
}
export default ProductList;