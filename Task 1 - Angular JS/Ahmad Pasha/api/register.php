<?php
require_once "dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => ""];

    if (!isset($_POST["userName"])) {
        $response["message"] = "Username is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["password"])) {
        $response["message"] = "Password is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["name"])) {
        $response["message"] = "Name is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["mail"])) {
        $response["message"] = "Mail is required!";
        echo json_encode($response);
        exit;
    }

    $userName = $_POST["userName"];
    $password = $_POST["password"];
    $name = $_POST['name'];
    $mail = $_POST['mail'];

    if ($userName == '' || $password == '') {
        $response["message"] = "Username & Password shouldn't be empty";
        echo json_encode($response);
        exit;
    }

    $query = "SELECT id FROM users WHERE user_name = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$userName]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) == 1) {
        $response["message"] = "Username already Taken!";
        echo json_encode($response);
        exit;
    }

    $query = "INSERT INTO users (name,mail,user_name, password) VALUES (?, ?, ?, ?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$name, $mail, $userName, $password]);

    if (!$result) {
        $response["message"] = $statment->errorInfo();
        echo json_encode($response);
    }

    $response["status"] = true;
    $response["message"] = "Successfully Registered!";
    echo json_encode($response);
    exit;
}

$response["message"] = "ONLY POST method Accepted";
echo json_encode($response);
