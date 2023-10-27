<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'errors.log');
require_once 'dbConfig.php';

$headers = getallheaders();

$response = ['status' => false, 'message' => ''];

if (empty($headers['Authorization'])) {
  $response['message'] = 'Token is required';
  echo json_encode($response);
  exit;
}

$token = str_replace('Bearer ', '', $headers['Authorization']);
$query = "SELECT id FROM tokens WHERE token=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$token]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);
if (!($result && $result['id'])) {
  $response['message'] = 'Invalid user';
  echo json_encode($response);
  exit;
}
