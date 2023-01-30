<?php

namespace Application;

use Application\Models\Database;
use Application\Models\Product;
use Application\Models\ProductTypes\Book;

require_once("../vendor/autoload.php");

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

$database = new Database();
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $productsArray = Product::getAllProducts($database);
        echo (json_encode($productsArray));
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        switch ($data['actionType']) {
            case 'addProducts':
                $products = Product::createObjectsFromArray($data['products']);
                foreach ($products as $p) {
                    $p->putIntoDB($database);
                }
                break;
        }
        break;
}