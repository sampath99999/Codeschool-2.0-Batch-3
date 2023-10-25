<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';

$jsonData = file_get_contents('php://input');

$postData = json_decode($jsonData, true);

$response = ["status" => false, "message" => "","data"=>""];

if (empty($postData['email']) || empty($postData['password'])) {
    $response['message'] = "Email, password, or confirmPassword is not present";
} else {
    $email = $postData['email'];
    $password = $postData['password'];
    $confirmPassword = $postData['confirmPassword'];
    if ($password !== $confirmPassword) {
        $response['message'] = "Passwords do not match";
    } else {
        $password = md5($password);

        $query = "SELECT user_id FROM users WHERE email = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$email]);
        $result = $stmt->fetch();

        if ($result && $result['user_id']) {
            $response['message'] = "$email already exists";
        } else {
            $token = generateRandomString(10);
            $first_name = $postData['firstName'];
            $last_name = $postData['lastName'];
            $address = $postData['address'];
            $username = $postData['username'];
            $phone_number = $postData['phone'];

            $query = "INSERT INTO users (first_name, last_name, username, email, password, address, phone_number, registration_date, is_active, token) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), TRUE, ?)";
            $stmt = $pdo->prepare($query);
            $result = $stmt->execute([$first_name, $last_name, $username, $email, $password, $address, $phone_number, $token]);


            if ($result) {
                $response['status'] = true;
                $response['message'] = "User Successfully Registered";
            }
        }
    }
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

echo json_encode($response);
