<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';

$jsonData = file_get_contents('php://input');

$postData = json_decode($jsonData, true);

$response = ["status" => false, "message" => ""];

if (empty($postData['id'])) {
    $response['message'] = "Id is not present";
}
else {
    $id = $postData['id'];
    $query = "SELECT * FROM products WHERE id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$id]);
    $response = $stmt->fetch();
}

echo json_encode($response);
