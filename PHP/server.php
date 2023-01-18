<?php
  header("Access-Control-Allow-Origin: http://localhost:3000");
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') die ("Received request is not POST");
  if (isset($_POST["name"])) {
    $user_name=$_POST['name'];
    echo (("Hello from server: $user_name"));
  }
  else {
    echo ("Name is empty");
    echo("Dumping...");
    echo(file_get_contents('php://input'));
  }



?>
