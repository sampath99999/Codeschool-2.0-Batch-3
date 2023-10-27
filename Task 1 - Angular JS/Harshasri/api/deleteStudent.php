<?php

require_once("./dbConfig.php");
$response = ["status" => false, "message" => "","data"=>null];

if ($_SERVER["REQUEST_METHOD"] == 'POST') {

    $data = json_decode(file_get_contents('php://input',true));

    $studentId = $data->id;
   

    if(!isset($data->id)){
    $response["message"] = "Student ID is required!";
        echo json_encode($response);
        exit;
    }

    $pdo = getPDO();
    if (!$pdo) {
        $response["message"] = "Database Not Connected!";
        echo json_encode($response);
        exit;
    }

  
        

        $query="DELETE FROM student_info  WHERE id = ?";
        $statment = $pdo->prepare($query);
        $result = $statment->execute([$studentId]);
        
        
        if (!$result) {
            $response["message"] = $statment->errorInfo();
            echo json_encode($response);
            exit;
        }
        else{
                $response["status"] = true;
        $response["message"] = "Student Deleted Successfully!!";
        echo json_encode($response);
        exit;

        }
        $response["status"] = false;
$response["message"] = "Student ID not provided";
echo json_encode($response);
exit;

        
    
}
