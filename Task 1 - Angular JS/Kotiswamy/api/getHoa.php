<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'errors.log');

require_once "dbConfig.php";

require_once "tokenValidation.php";

$response = ['status' => false, 'message' => '', 'data' => []];

$input = json_decode(file_get_contents('PHP://input'), true);

if (empty($input["hoaId"])) {
  $response["message"] = "HOA id is required";
  echo json_encode($response);
}
$hoaId = $input["hoaId"];
$query = "SELECT * FROM head_of_accounts WHERE id=:hoaId";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':hoaId', $hoaId);
$stmt->execute();
$result = $stmt->fetch(PDO::FETCH_ASSOC);
$response["message"] = "Successful";
$response["data"] = $result;
$response['status'] = true;
echo json_encode($response);
