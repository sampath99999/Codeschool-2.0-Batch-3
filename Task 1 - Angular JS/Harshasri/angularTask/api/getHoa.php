<?php

require_once "./dbConfig.php";

$response = ["status" => false, "message" => "", "data" => null];


if (isset($_GET['hoa_number'])) {
    $hoaNumber = $_GET['hoa_number'];

$pdo = getPDO(); 

if (!$pdo) {
    $response["status"] = false;
    $response["message"] = "Database Not Connected!";
    echo json_encode($response);
    exit;
}
   
    $sql = "SELECT * FROM sanction WHERE hoa_number = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$hoaNumber]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
      
        $response["message"] = "Data fetched successfuly!";
        $response["data"] = $result;
        $response["status"]=true;
        echo json_encode($response);
        exit;
    } else {
        $response["message"] = "Data is not present!";
        $response["status"]=false;
        echo json_encode($response);
        exit;
       
    }
} else {
        $response["message"] = "Hoa Number is missing.";
        $response["status"]=false;
        echo json_encode($response);
        exit;
   
}
?>
