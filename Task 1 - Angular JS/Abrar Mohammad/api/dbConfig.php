<?php
$dbHost = "pgsql:host=localhost;dbname=ifmis";
$dbUser = 'postgres';
$dbPassword = "postgres";

try {
    $pdo = new PDO($dbHost, $dbUser, $dbPassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'connection failed' . $e->getMessage();
    exit;
}
?>