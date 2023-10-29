<?php

require_once "./dbConfig.php";

$data = json_decode(file_get_contents('php://input'), true);

if(empty($data['token'])){
    echo responseError("Token is empty.");
    exit;
}

$query = "DELETE FROM sessions WHERE token = ?";    
$statement = $pdo->prepare($query);
$statement->execute([$data['token']]);
$session_update = $statement->fetchAll(PDO::FETCH_ASSOC);

if(!$session_update){
    http_response_code(500);
    echo responseError($statement->errorInfo());
    exit;
}

// Successful Logout.
http_response_code(200);
echo responseSuccess("Logout Successful.", '');
exit;


?>