<?php

namespace Application\Models\ProductTypes;

use Application\Models\Product;

class Book extends Product
{
    private $weight;

    public function __construct($sku, $name, $price, $weight)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->weight = $weight;
    }

    public function putIntoDB($database)
    {
        $database->execute("INSERT INTO Products VALUES (?,?,?,'book')", [$this->sku, $this->name, $this->price]);
        $database->execute("INSERT INTO Books (ProductSKU, WeightInKg) VALUES (?,?)", [$this->sku, $this->weight]);
    }

    public static function getAllBooks($database)
    {
        $stmt = $database->execute("SELECT p.*,b.WeightInKg FROM Products p INNER JOIN Books b on p.SKU=b.ProductSKU");
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}