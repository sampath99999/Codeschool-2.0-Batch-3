<?php



error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
require_once 'admin.php';
$jsonData = file_get_contents('php://input');

$postData = json_decode($jsonData, true);
$response =  ["status" => false, "message" => "", "data" => ""];
if (!isset($postData['email'])) {

    $response['status'] = false;
    $response['message'] = "Email is not present";
    echo json_encode($response);
    exit;
}
if (!isset($postData['password'])) {

    $response['status'] = false;
    $response['message'] = "Password is not present";
    echo json_encode($response);
    exit;
}

$email = $postData['email'];
$password = md5($postData['password']);
$query = "select user_id from users where email = ? and password = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$email, $password]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['user_id']) {
    $query = "select token from users where email = ?";
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([$email]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $token = $result['token'];
    if(is_admin($pdo, $token)) {
        $response['admin'] = true;
        $response['status'] = true;
        $response['message'] = "Login successful!";
        $response['data'] = $token;
        echo json_encode($response);
        exit;
    }
    elseif ($result) {
        $response['status'] = true;
        $response['message'] = "Login successful!";
        $response['data'] = $token;
        echo json_encode($response);
        exit;
    }
    else{
        $response['status'] = false;
        $response['message'] = 'Login Failed';
        echo json_encode($response);
    }

} else {
    $response['status'] = false;
    $response['message'] = "Username or Password is invalid.";
    $response['res'] = $result;
    $response['pas'] = $password;
    $response['email'] = $query;
    echo json_encode($response);
    exit;
}

