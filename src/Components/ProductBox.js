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
                        name={this.props.product.sku}
                        className="checkBox"    
                        type="checkbox"
                        checked={this.state.checkboxChecked}
                        onChange={e => this.setState({ checkboxChecked: e.target.checked })}
                    />
                    <div>
                        {this.props.product.sku} <br />
                        {this.props.product.name} <br />
                        {this.props.product.price} <br />
                        {this.props.product.printProductSpecificAttributes()}
                    </div>
                </Container>
            </Col>
        );
    }
}
export default ProductBox;