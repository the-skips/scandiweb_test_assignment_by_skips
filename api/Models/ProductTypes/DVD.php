<?php

namespace Application\Models\ProductTypes;

use Application\Models\Product;

class DVD extends Product
{
    private $size;

    public function __construct($sku, $name, $price, $size)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->size = $size;
    }

    public function putIntoDB($database)
    {
        $database->execute("INSERT INTO Products VALUES (?,?,?,'dvd')", [$this->sku, $this->name, $this->price]);
        $database->execute("INSERT INTO DVDs (ProductSKU, SizeInMB) VALUES (?,?)", [$this->sku, $this->size]);
    }


}