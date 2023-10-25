<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response = ["status" => false, "message" => "", "data" => ""];

$data = json_decode(file_get_contents("php://input"));

if (!$data->adminId) {
    $response['status'] = false;
    $response['message'] = 'Admin Id Cannot be Empty';
    echo json_encode($response);
    exit;
}

if (!$data->password) {
    $response['status'] = false;
    $response['message'] = 'Admin Id Cannot be Empty';
    echo json_encode($response);
    exit;
}

$password = md5($data->password);
$query = "SELECT * FROM ADMINS WHERE admin_id = ? AND password = ?";

$stmt = $pdo->prepare($query);

$stmt->execute([$data->adminId, $password]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$result) {
    $response['status'] = false;
    $response['message'] = 'Username or Password is Invalid.';
    echo json_encode($response);
    exit;
}
$token = generateRandomString(10);
$query = "INSERT INTO tokens (token, admin_id) VALUES (?, ?)";
$stmt = $pdo->prepare($query);

if ($stmt->execute([$token, $result['id']])) {
    $response['status'] = true;
    $response['message'] = "Login successful!";
    $response['data'] = $token;
    echo json_encode($response);
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
