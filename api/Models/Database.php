<?php

namespace Application\Models;

use PDO;
use PDOException;

class Database
{
    private $serverName = 'localhost';
    private $userName = 'id20164951_api';
    private $password = 'za5v2Us-*13DOu~/';
    private $dbName = 'id20164951_products';
    private $connection;

    public function __construct()
    {
        try {
            $this->connection = new PDO("mysql:host=$this->serverName;dbname=$this->dbName", $this->userName, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Unable to establish connection to database. Error:  " . $e->getMessage();
            die();
        }
    }

    public function execute($statement, $params = null)
    {
        if (!$params) {
            return $this->connection->query($statement);
        }
        $prepared = $this->connection->prepare($statement);
        $prepared->execute($params);
        return $prepared;
    }

}