<?php

namespace Application;

use Application\Models\Database;
use Application\Models\Product;

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
        $products = Product::createObjectsFromArray($data['products']);
        switch ($data['actionType']) {
            case 'addProducts':
                foreach ($products as $p) {
                    $p->putIntoDB($database);
                }
                break;
            case 'deleteProducts':
                foreach ($products as $p) {
                    $p->deleteFromDB($database);
                }
                break;
        }
        break;
}