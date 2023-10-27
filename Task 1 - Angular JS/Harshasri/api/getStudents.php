<?php

require_once("./dbConfig.php");
$response = ["status" => false, "message" => "","data"=>null];

if ($_SERVER["REQUEST_METHOD"] == 'GET') {

    $data = json_decode(file_get_contents('php://input',true));

   

    $pdo = getPDO();
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }
    $query = "SELECT * FROM student_info";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
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
}
else {
        $response["message"] = "Invalid Request method!.";
        $response["status"]=false;
        echo json_encode($response);
        exit;
   
}
?>

