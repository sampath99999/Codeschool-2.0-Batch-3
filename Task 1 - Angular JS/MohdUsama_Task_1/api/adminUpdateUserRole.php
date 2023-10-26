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
$role = $postData["role"];
$query = $pdo->prepare("
    SELECT role FROM users WHERE user_id = ?
");
$query->execute([$id]);
$data = $query->fetch(PDO::FETCH_ASSOC);

if($data['role'] == 1){
    $response["status"] = false;
    $response['message']= 'Cannot Move Admin to a Lower Authority Level!';
    header('HTTP/1.0 400 Bad Request');
    echo json_encode($response);
    exit;
}

$query = $pdo->prepare("
    UPDATE  users SET role = ? WHERE user_id = ?
");

$query->execute([$role, $id]);

$response['data'] = '';
$response['status'] = true;
$response['message'] = "Successfully Updated Order Status";
echo json_encode($response);
?>
