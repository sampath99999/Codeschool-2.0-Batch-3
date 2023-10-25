<?php

require_once './dbconfig.php';
$post = file_get_contents('php://input');
$json = json_decode($post, true);

$pdo=getPDO();
$response=["status"=>false,"message"=>"LOGIN FAILED"];


if(empty($json['name'])){
       $response['message']="NAME IS REQUIRED";
       echo json_encode($response);
       exit;
}
if(empty($json['password'])){
        $response['message']="PASSWORD IS REQUIRED";
        echo json_encode($response);
        exit;
}
$name=$json['name'];
$password=md5($json['password']);

    $query='SELECT * from users where Register_name = ? and password = ?';
    $smt=$pdo->prepare($query);
    $smt->execute([$name,$password]);
    $result = $smt->fetchAll(PDO::FETCH_ASSOC);
    if(count($result) == 1){
        $response["status"] = true;
        $response["message"] = " LOGIN SUCCESSFUL ";
        echo json_encode($result);
        exit; 
    }
    $response["message"] = " USER NAME OR PASSWORD IS INCORRECT ";
    echo json_encode($response);
    exit;
