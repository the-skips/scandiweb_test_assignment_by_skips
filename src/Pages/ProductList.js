import React from "react";
import NavigationButton from "../Components/NavigationButton";
import ProductBox from "../Components/ProductBox";
import { Book } from "../DTO/Book";
import { DVD } from "../DTO/DVD";
import { Furniture } from "../DTO/Furniture";

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
                    <div className="Header">
                        Product List
                        {<NavigationButton/>}
                        <input type="submit" value="Mass Delete"/>
                    </div>
                    <div className="Body">
                        {this.showProducts()}
                    </div>
                </form>
            </div>
        );
    }
}
export default ProductList;