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
$base_directory = '../uploads/';
$query = $pdo->prepare('
    SELECT  image FROM products WHERE id = ?
');

$query->execute([$postData]);
$data = $query->fetch(PDO::FETCH_ASSOC);
if(unlink($base_directory.$data['image'])){
    $query = $pdo->prepare("
        DELETE FROM  products WHERE  id = ?
    ");

    try{
        $query->execute([$postData]);
        $response['data'] = '';
        $response['status'] = true;
        $response['message'] = "Successfully Deleted Product";
    }catch(PDOException $e){
        $response["status"] = false;
        $response["message"] = "Please Fulfill previous orders for this product before deleting it";
        header('HTTP/1.0 400 Bad Request');
        echo json_encode($response);
        exit;
    };
}
else{
    $response['status'] = false;
    $response['message'] = 'Failed to Delete Product and related assets';
}
echo json_encode($response);
?>
