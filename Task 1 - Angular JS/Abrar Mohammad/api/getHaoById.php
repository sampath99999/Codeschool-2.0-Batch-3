<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once("dbConfig.php");

$response = ['status' => false, 'message' => "", 'data' => []];

if (!isset($_GET['haoId'])) {
    $response['message'] = 'haoId is required';
    echo json_encode($response);
    exit;
}

try {
    $haoId = $_GET['haoId'];
    $getHao = 'SELECT * FROM hoa_list WHERE id = ?';
    $stmt = $pdo->prepare($getHao);
    $stmt->execute([$haoId]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data fetched successfully.";
    $response['data'] = $result;
    echo json_encode($response);
    exit;
} catch (Exception) {
    $response['message'] = 'OOPS something went wrong..';
    echo json_encode($response);
    exit;
}

?>