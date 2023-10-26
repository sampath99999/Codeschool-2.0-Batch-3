<?php

require("./dbConfig.php");

$input = file_get_contents('php://input');
$input = json_decode($input, true);

if (!isset($input["username"])) {
    echo "Username is required!";
    exit;
}
if (!isset($input["password"])) {
    echo "Password is required!";
    exit;
}

$username = $input["username"];
$password = $input["password"];
$response = ["status" => true, "message" => "", "data" => null];

if ($username == '' || $password == '') {
    $response["status"] = false;
    $response["message"] = "Username & Password shouldn't be empty";
    echo json_encode($response);
    exit;
}

if (!$pdo) {
    $response["status"] = false;
    $response["message"] = "Database Not Connected!";
    echo json_encode($response);
    exit;
}

$query = "SELECT * FROM users WHERE user_name = ? AND password = ?";

$statment = $pdo->prepare($query);
$statment->execute([$username, $password]);
$user = $statment->fetchAll(PDO::FETCH_ASSOC);

if (count($user) == 1) {
    $response["message"] = "LoggedIn Successfully!";

    
    $response["data"] = $user[0];
    echo json_encode($response);
    exit;
} else {
    $response["status"] = false;
    $response["message"] = "Username & Password shouldn't match";
    echo json_encode($response);
    exit;
}

