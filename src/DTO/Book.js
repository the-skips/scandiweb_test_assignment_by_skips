import { Product } from "./Product";

export class Book extends Product {
    constructor(sku, name, price, weight) {
        super(sku, name, price);
        this.weight = weight;
        this.productType = 'book';
    }

    printProductSpecificAttributes() {
        let s = 'Weight: ';
        s+= this.weight;
        s+= ' KG';
        return s;
    }
}