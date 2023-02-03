import React from "react";

class ProductBox extends React.Component {
    constructor(props) {
        super();
        this.state = {
            checkboxChecked: false
        };
    }


    render() {
        return(
        <div>
            <input
                name={this.props.product.sku}
                type="checkbox"
                checked={this.state.checkboxChecked}
                onChange={e => this.setState({ checkboxChecked: e.target.checked })}
            />
            <div>
                {this.props.product.sku} <br/>
                {this.props.product.name} <br/>
                {this.props.product.price} $<br/>
                {this.props.product.printProductSpecificAttributes()}
            </div>
        </div>
        );
    }
}
export default ProductBox;