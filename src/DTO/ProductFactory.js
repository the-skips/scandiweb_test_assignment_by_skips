import Book from "./Book";
import DVD from "./DVD";
import Furniture from "./Furniture";

export const parseDataIntoProducts = (json) => {
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
    return productsArray;
}