<?php

namespace Application\Models;

use Application\Models\ProductTypes\Book;
use Application\Models\ProductTypes\DVD;
use Application\Models\ProductTypes\Furniture;

abstract class Product
{
    protected $sku;
    protected $name;
    protected $price;

    public function getSKU() {
        return $this->sku;
    }

    public static function createObjectsFromArray($data)
    {
        $objectsArray = array();
        for ($i = 0; $i < count($data); $i++) {
            $object = $data[$i];
            switch ($object['productType']) {
                case 'book':
                    $resultObject = new Book($object["sku"], $object["name"], $object["price"], $object["weight"]);
                    array_push($objectsArray, $resultObject);
                    break;
                case 'dvd':
                    $resultObject = new DVD($object['sku'], $object['name'], $object['price'], $object['size']);
                    array_push($objectsArray, $resultObject);
                    break;
                case 'furniture':
                    $resultObject = new Furniture($object['sku'], $object['name'], $object['price'], $object['height'], $object['width'], $object['length']);
                    array_push($objectsArray, $resultObject);
                    break;
            }
        }
        return $objectsArray;
    }

    abstract public function putIntoDB($database);
    public function deleteFromDB($database)
    {
        $database->execute("DELETE FROM Products WHERE SKU= ?", [$this->sku]);
    }

    public static function getAllProducts($database)
    {
        $products = array();
        $products = array_merge($products, Book::getAllBooks($database));
        $products = array_merge($products, DVD::getAllDVDs($database));
        $products = array_merge($products, Furniture::getAllFurniture($database));
        return $products;
    }
}