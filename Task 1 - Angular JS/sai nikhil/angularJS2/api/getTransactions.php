<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => "", "data" => ""];


$query = "SELECT t.id , p.party_name , t.transaction_type ,sum(tp.price) price ,t.created_at, sum(tp.quantity) quantity FROM transactions t
JOIN parties p on t.party_id = p.id
JOIN transaction_products tp on tp.transaction_id = t.id
group by (t.id,p.party_name,t.transaction_type);";

$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if (!$result) {
    $response["message"] = "No data found.";
    $response["status"] = false;
    echo json_encode($response);
    exit;
}

$response["status"] = true;
$response["data"] = $result;
echo json_encode($response);
