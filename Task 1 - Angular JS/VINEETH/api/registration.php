<?php
require_once './dbconfig.php';
$post = file_get_contents('php://input');
$json = json_decode($post, true);
$pdo=getPDO();

    header('Content-Type: application/json');
    $response=["status"=>false,"message"=>""];

    if(!isset($json["name"])){
        $response['message']="NAME IS REQUIRED";
        echo json_encode($response);
        exit;
    }
    if(!isset($json["password"])){
       $response["message"]="PASSWORD IS REQUIRED";
       echo json_encode($response);
       exit;
    }
    if(!isset($json["email"])){
        $response["message"]="EMAIL IS REQUIRED";
        echo json_encode($response);
        exit;
    }
    if(!isset($json["phone"])){
        $response["message"]="PHONE NUMBER IS REQUIRED";
        echo json_encode($response);
        exit;
    }
    $name=$json["name"];
    $password=md5($json["password"]);
    $email=$json["email"];
    $phone=$json["phone"];
    if ($name == '' || $password == '' || $email == '' || $phone == '' ) {
        $response["message"] = "USERNAME , PASSWORD ,EMAIL AND PHONE SHOULDN'T BE EMPTY";
        echo json_encode($response);
        exit;
    }
   
    if (!$pdo) {
        $response["message"] = "DATABASE  NOT CONNECTED";
        echo json_encode($response);
        exit;
    }
    $query = "SELECT id FROM users WHERE Register_name = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$name]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) == 1) {
        $response["message"] = "USERNAME ALREADY TAKEN!";
        echo json_encode($response);
        exit;
    }
    $query = "INSERT INTO users (register_name, email, password, phone_no) VALUES (?, ?, ?, ?)";

    $statement =$pdo->prepare($query);
    $result=$statement->execute([$name, $email, $password, $phone]);

    if(!$result){
        $response["message"]=$statement->errorInfo();
        echo json_encode($response);
    }
    $response["status"] = true;
    $response["message"] = "SUCCESSFULLY REGISTERED!";
    echo json_encode($response);
    exit;
