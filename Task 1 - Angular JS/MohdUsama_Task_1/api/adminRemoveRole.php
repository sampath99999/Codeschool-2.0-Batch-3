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
if($postData['id'] == 1){
    $response['status'] = false;
    $response['message'] = "Unauthorized Access! Cannot delete Admin Role!";
    header('HTTP/1.0 400 Bad Request');
    echo json_encode($response);
    exit;
}
$query = $pdo->prepare("
    DELETE FROM  roles WHERE  id = ?
");

try{
    $query->execute([$postData['id']]);
}catch(PDOException $e){
    $response["status"] = false;
    $response["message"] = "Please check existing users roles before deleting this role";
    header('HTTP/1.0 400 Bad Request');
    echo json_encode($response);
    exit;
};

$response['data'] = '';
$response['status'] = true;
$response['message'] = "Successfully Deleted Role";
echo json_encode($response);
?>
