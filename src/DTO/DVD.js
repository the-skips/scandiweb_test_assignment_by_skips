import { Product } from "./Product";

export class DVD extends Product {
    constructor(sku, name, price, size) {
        super(sku, name, price);
        this.size = size;
        this.productType = 'dvd';
    }

    printProductSpecificAttributes() {
        let s = 'Size: ';
        s += this.size;
        s += ' MB';
        return s;
    }
}