<?php

namespace Application\Models\ProductTypes;

use Application\Models\Product;

class Furniture extends Product
{
    private $height;
    private $width;
    private $length;

    public function __construct($sku, $name, $price, $height, $width, $length)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
    }

    public function putIntoDB($database)
    {
        $database->execute("INSERT INTO Products VALUES (?,?,?,'furniture')", [$this->sku, $this->name, $this->price]);
        $database->execute("INSERT INTO Furniture (ProductSKU, HeightInM, WidthInM, LengthInM) VALUES (?,?,?,?)", [$this->sku, $this->height, $this->width, $this->length]);
    }

    public static function getAllFurniture($database)
    {
        $stmt = $database->execute("SELECT p.*,f.HeightInM, f.WidthInM, f.LengthInM FROM Products p INNER JOIN Furniture f on p.SKU=f.ProductSKU");
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}