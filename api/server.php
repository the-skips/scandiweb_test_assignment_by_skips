<?php

namespace Application;

use Application\Models\Database;
use Application\Models\ProductTypes\Book;

require_once ("../vendor/autoload.php");

header("Access-Control-Allow-Origin: *");

echo ("Dumping...");
echo (file_get_contents('php://input'));
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die("Received request is not POST");
}
$database = new Database();
$data = json_decode(file_get_contents('php://input'), true);
$bookExample = new Book($data["sku"], $data["name"], $data["price"], $data["weight"]);
$bookExample->putIntoDB($database);