<?php
$response = ["status" => false, "message" => ""];
require_once './dbConfig.php';

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $data = json_decode(file_get_contents('php://input',true));

    // echo json_encode($data);
 
    $username = $data->username;
    $password = $data->password;
    
    // $username = $data['username'];
    
//    $password=$data['password'];

    if (!isset($username)) {
        $response["message"] = "Username is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($password)) {
        $response["message"] = "Password is required!";
        echo json_encode($response);
        exit;
    }


    if ($username == '' || $password == '') {
        $response["message"] = "Username & Password shouldn't be empty";
        echo json_encode($response);
        exit;
    }

    $pdo = getPDO();
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }

    $query = "SELECT id FROM employee WHERE username = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$username]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) == 1) {
        $response["message"] = "Username already Taken!";
        echo json_encode($response);
        exit;
    }

    $query = "INSERT INTO employee (username, password) VALUES (?, ?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$username, $password]);

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