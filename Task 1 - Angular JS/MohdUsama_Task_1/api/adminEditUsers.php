<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
require_once("admin.php");
$jsonData = file_get_contents('php://input');
$postData = json_decode($jsonData, true);
$token = null;
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $authHeaderParts = explode(' ', $authHeader);
    if (count($authHeaderParts) === 2 && $authHeaderParts[0] === 'Bearer') {
        $token = $authHeaderParts[1];
    } else {
        header('HTTP/1.0 400 Bad Request');
        echo 'Invalid Authorization header format';
        exit;
    }
} else {
    header('HTTP/1.0 401 Unauthorized');
    echo 'Authorization header is missing';
    exit;
}
$response = ["status" => false, "message" => "","data"=>""];
if(!is_admin($pdo, $token)) {
    $response['admin'] = false;
    $response['message']= 'Unauthorized Access';
    exit;
}
$response['admin'] = true;
$id = $postData["user_id"];
$first_name = $postData["first_name"];
$last_name = $postData["last_name"];
$address = $postData["address"];
$is_active = $postData["is_active"];
// echo ($is_active);
var_dump($postData);
$query = $pdo->prepare("
    UPDATE  users SET first_name = ?, last_name = ?, address = ?, is_active = ? WHERE user_id  = ?
");

$query->bindParam(1, $first_name, PDO::PARAM_STR);
$query->bindParam(2, $last_name, PDO::PARAM_STR);
$query->bindParam(3, $address, PDO::PARAM_STR);
$query->bindParam(4, $is_active, PDO::PARAM_BOOL);
$query->bindParam(5, $id, PDO::PARAM_INT);

$query->execute();

$response['data'] = '';
$response['status'] = true;
$response['message'] = "Successfully Updated User Details";
echo json_encode($response);
?>
