<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$response = ["status" => false, "message" => ""];
if (!isset($data['token']) || empty($data['token'])) {
    $response["message"] = "user is not authenticate";
    echo json_encode($response);
    exit;
}
$token = $data['token'];
$query = "delete from tokens where token=?";
$stmt = $pdo->prepare($query);
if ($stmt->execute([$token])) {
    $response["status"] = true;
    $response["message"] = "Session Expired";
    echo json_encode($response);
}
