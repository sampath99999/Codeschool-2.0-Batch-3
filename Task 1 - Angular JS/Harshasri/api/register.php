<?php
$response = ["status" => false, "message" => ""];
require_once './dbConfig.php';

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $data = json_decode(file_get_contents('php://input',true));
 
    $name = $data->name;
    $password = $data->password;
    $email = $data->email;
    $dob = $data->dob;
    $phoneNumber = $data->phoneNumber;
    
   

    if (!isset($name)) {
        $response["message"] = "Username is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($password)) {
        $response["message"] = "Password is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($email)) {
        $response["message"] = "email is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($dob)) {
        $response["message"] = "dob is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($phoneNumber)) {
        $response["message"] = "Phone Number is required!";
        echo json_encode($response);
        exit;
    }


    if ($name == '' || $password == '' || $email=='' || $dob=='' || $phoneNumber=='') {
        $response["message"] = "Fields shouldn't be empty";
        echo json_encode($response);
        exit;
    }

    $pdo = getPDO();
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }

    $query = "SELECT id FROM users WHERE email = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$email]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) == 1) {
        $response["message"] = "email already Taken!";
        echo json_encode($response);
        exit;
    }

    $query = "INSERT INTO users (name, password,email,phone_no,dob) VALUES (?, ?,?,?,?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$name, $password,$email,$phoneNumber,$dob]);

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