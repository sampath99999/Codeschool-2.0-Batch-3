<?php

require_once "dbConfig.php";


$headers = getallheaders();


$response = ['status' => false, 'message' => '',"data"=>null];

if (empty($headers['Authorization'])) {
  $response['message'] = 'Token is required';
  $response["status"] = 401;
  echo json_encode($response);
  exit;
}

$pdo = getPDO();

$token = str_replace('Bearer ', '', $headers['Authorization']);
$query = "SELECT id FROM users WHERE token=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$token]);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
if(!(count($result)>0)){
  $response["status"] = 401;
  $response["message"]="Invalid user";
  echo json_encode($response);
  exit;
}
