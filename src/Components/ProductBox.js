import React from "react";
import { Col, Container } from "react-bootstrap";

class ProductBox extends React.Component {
    constructor(props) {
        super();
        this.state = {
            checkboxChecked: false
        };
    }


    render() {
        return (
            <Col sm="3">
                <Container className="productBox border rounded-3 border-primary">
                    <input
                        name={JSON.stringify(this.props.product)}
                        className="delete-checkbox"    
                        type="checkbox"
                        checked={this.state.checkboxChecked}
                        onChange={e => this.setState({ checkboxChecked: e.target.checked })}
                    />
                    <Container className="py-5">
                        {this.props.product.sku} <br />
                        {this.props.product.name} <br />
                        {this.props.product.price} $ <br />
                        {this.props.product.printProductSpecificAttributes()}
                    </Container>
                </Container>
            </Col>
        );
    }
}
export default ProductBox;