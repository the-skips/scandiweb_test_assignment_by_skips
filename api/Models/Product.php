<?php

namespace Application\Models;

abstract class Product
{
    private $sku;
    private $name;
    private $price;

    abstract public function putIntoDB($database);
    public function deleteFromDB($database) {
        $database->execute("DELETE FROM Products WHERE SKU= ?", [$this->sku]);
    }
}