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
        if ($_POST['actionType'] === 'addProduct') {
            $product = Product::createObjectFromJSON(file_get_contents('php://input'));
            $product->putIntoDB($database);
        }
        break;

}