<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$response = ["status" => false, "message" => "", "data" => ""];
if (!isset($data['userName']) || empty($data['userName'])) {

    $response['status'] = false;
    $response['message'] = "User name is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['password']) || empty($data['password'])) {

    $response['status'] = false;
    $response['message'] = "Password is not present";
    echo json_encode($response);
    exit;
}
$userName = $data['userName'];
$password = md5($data['password']);
$query = "select * from user_details where user_name = ? and password = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$userName, $password]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['user_name']) {
    $userId = ($result['id']);
    $token = generateRandomString(10);
    $query = "INSERT INTO tokens(user_id,token) values (?,?)";
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([$userId, $token]);

    if ($result) {
        $response['status'] = true;
        $response['message'] = "Login successful!";
        $response['data'] = $token;
        $response = json_encode($response);
        echo ($response);
        exit;
    }
} else {
    $response['status'] = false;
    $response['message'] = "Username or Password is invalid.";
    echo json_encode($response);
    exit;
}
function generateRandomString($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}
