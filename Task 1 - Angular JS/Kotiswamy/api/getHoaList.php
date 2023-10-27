<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'errors.log');

require_once "dbConfig.php";

require_once "tokenValidation.php";


$response = ['status' => false, 'message' => '', 'data' => []];

$input = json_decode(file_get_contents('PHP://input'), true);



$query = "SELECT id,hoa_tier,dep_hod,e_s,est_amount,created_at FROM head_of_accounts";
$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$response["message"] = "Successful";
$response["data"] = $result;
$response['status'] = true;
echo json_encode($response);
