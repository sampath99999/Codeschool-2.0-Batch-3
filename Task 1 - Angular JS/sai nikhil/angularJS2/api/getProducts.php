<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => "", "data" => ""];

$query = "SELECT p.id,p.product_name,p.product_price,p.product_category,i.stock FROM products p
LEFT JOIN inventory i on i.product_id = p.id ;
";

$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!$result) {
    $response["status"] = false;
    $response["message"] = "No Data Found.";
    echo json_encode($response);
}

$response["status"] = true;
$response["data"] = $result;
echo json_encode($response);
