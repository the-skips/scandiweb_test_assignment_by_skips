<?php

namespace Application\Models;

use Application\Models\ProductTypes\Book;
use Application\Models\ProductTypes\DVD;
use Application\Models\ProductTypes\Furniture;

abstract class Product
{
    private $sku;
    private $name;
    private $price;

    public static function createObjectFromJSON($json)
    {
        $resultObject = null;
        $data = json_decode($json, true);
        switch ($data['productType']) {
            case 'book':
                $resultObject = new Book($data["sku"], $data["name"], $data["price"], $data["weight"]);
                break;
            case 'dvd':
                $resultObject = new DVD($data['sku'], $data['name'], $data['price'], $data['size']);
                break;
            case 'furniture':
                $resultObject = new Furniture($data['sku'], $data['name'], $data['price'], $data['height'], $data['width'], $data['length']);
                break;
        }
        return $resultObject;
    }

    abstract public function putIntoDB($database);
    public function deleteFromDB($database)
    {
        $database->execute("DELETE FROM Products WHERE SKU= ?", [$this->sku]);
    }

    public static function getAllProducts($database)
    {
        $products = array();
        $products['books'] = Book::getAllBooks($database);
        $products['dvds'] = DVD::getAllDVDs($database);
        $products['furniture'] = Furniture::getAllFurniture($database);
        return $products;
    }
}