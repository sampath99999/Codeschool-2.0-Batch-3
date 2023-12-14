<?php
define("DB_HOST", "localhost");
define("DB_PORT", "5432");
define("DB_NAME", "product_list");
define("DB_USERNAME", "postgres");
define("DB_PASSWORD", "Vineeth@123");

function getPDO()
{
    try {
        $pdo = new PDO("pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME, DB_USERNAME, DB_PASSWORD);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
        return null;
    }
}