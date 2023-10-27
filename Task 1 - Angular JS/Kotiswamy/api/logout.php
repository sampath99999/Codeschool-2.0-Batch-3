<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set("error_log", "errors.log");
require_once "dbConfig.php";
require_once "tokenValidation.php";
$response = ["status" => false, "message" => ""];

$query = "DELETE FROM tokens WHERE token=:token";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':token', $token);
$result = $stmt->execute();
$response["status"] = true;
$response["message"] = "Logout successful";
echo json_encode($response);
