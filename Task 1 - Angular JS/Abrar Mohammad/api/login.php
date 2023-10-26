<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once("dbConfig.php");
$input = json_decode(file_get_contents('php://input'), true);
$response = ['status' => false, 'message' => '', 'data' => []];
if (!isset($input['email'])) {
    $response['message'] = 'email is a required field';
    echo json_encode($response);
    exit;
}
if (!isset($input['password'])) {
    $response['message'] = 'password is a required field';
    echo json_encode($response);
    exit;
}

try {
    $email = $input['email'];
    $password = md5($input['password']);
    $userQuery = "SELECT id FROM admin WHERE email = ?";
    $stmt = $pdo->prepare($userQuery);
    $stmt->execute([$email]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($result && $result['id']) {
        $token = generateRandomString(20);
        $updateQuery = "UPDATE admin set token = ? WHERE email = ?";
        $stmt = $pdo->prepare($updateQuery);
        $result = $stmt->execute([$token, $email]);
        if ($result) {
            $response['status'] = true;
            $response['message'] = 'Login Successful';
            $response['data'] = $token;
            echo json_encode($response);
            exit;
        } else {
            $response["message"] = "Username or password id incorrect";
            echo json_encode($response);
            exit;
        }
    } else {
        $response['message'] = 'Username or Password is invalid';
        echo json_encode($response);
        exit;
    }
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
    echo json_encode($response);
    exit;
}

function generateRandomString($length = 20)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}
?>

?>