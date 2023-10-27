<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => "", "data" => ""];

$query = "SELECT product_category, count(id) FROM products
           group by(product_category);";

$stmt =  $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!$result) {
    $response["status"] = false;
    $response["message"] = "No data found";
    echo json_encode($response);
    exit;
}
$response["status"] = true;
$response["message"] = "";
$response["data"] = $result;

echo json_encode($response);
