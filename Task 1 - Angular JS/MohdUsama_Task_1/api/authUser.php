<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
require_once("admin.php");
$jsonData = file_get_contents('php://input');

$postData = json_decode($jsonData, true);
if(is_admin($pdo, $postData["token"])) {
    $response['admin'] = true;
    echo json_encode($response);
    exit;
}
$response['admin'] = false;
echo json_encode($response);
?>
