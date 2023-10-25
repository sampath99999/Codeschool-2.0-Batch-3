<?php

$dsn = "pgsql:host=localhost;dbname=ecommerece;";
$dbUsername = "postgres";
$dbPassword = "Usama_984";

try {
    $pdo = new PDO($dsn, $dbUsername, $dbPassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
