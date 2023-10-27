<?php

require_once("./dbConfig.php");
$response = ["status" => false, "message" => "","data"=>null];

if ($_SERVER["REQUEST_METHOD"] == 'POST') {

    $data = json_decode(file_get_contents('php://input',true));

   $name = $data->name;
   $class=$data->class;
   $section=$data->section;
   $address=$data->address;
   $city=$data->city;
   

    if (!isset($name)) {
        $response["message"] = "Name is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($class)) {
        $response["message"] = "Class is required!";
        echo json_encode($response);
        exit;
    }
    
    if (!isset($section)) {
        $response["message"] = "Section is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($address)) {
        $response["message"] = "Address is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($city)) {
        $response["message"] = "City is required!";
        echo json_encode($response);
        exit;
    }
   
    if ($name == '' || $class == '' || $section == '' || $address == '' || $city == '' ) {
        $response["message"] = "Fileds shouldn't be empty";
        echo json_encode($response);
        exit;
    }

    $pdo = getPDO();
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }
    $query = "INSERT INTO student_info (name, class,section,address,city) VALUES (?, ?,?,?,?)";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$name, $class,$section,$address,$city]);
    if (!$result) {
        $response["message"] = $statment->errorInfo();
        echo json_encode($response);
        exit;
    }

    $response["status"] = true;
    $response["message"] = "Student Added Successfully!!";
    echo json_encode($response);
    exit;

    
}

$response["status"] = false;
$response["message"] = "Only POST request are accepted.";
echo json_encode($response);
exit;

?>

