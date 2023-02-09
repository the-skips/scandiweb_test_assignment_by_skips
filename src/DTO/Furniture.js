import { Product } from "./Product";

export default class Furniture extends Product {
    constructor(sku, name, price, height, width, length) {
        super(sku, name, price);
        this.height = height;
        this.width = width;
        this.length = length;
        this.productType = 'furniture';
    }

    printProductSpecificAttributes() {
        let s = 'Dimension: ';
        s += this.height; s+='x';
        s += this.width; s+='x';
        s += this.length;
        return s;
    }
}