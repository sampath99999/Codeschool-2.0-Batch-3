<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];
$data = json_decode(file_get_contents("php://input"));

$token = $data->token;


$query = "select * from tokens where token =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$token]);
$result = $stmt->fetch();

if (!$result) {
    $response["status"] = false;
    $response["message"] = "Error Logging Out";
    echo json_encode($response);
    exit;
}
$query = "delete from tokens where token =?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$token]);

$response["status"] = true;
$response["message"] = "Logged Out SuccessFully";
echo json_encode($response);
