<?php

require_once("./dbConfig.php");
$response = ["status" => false, "message" => "","data"=>null];

if ($_SERVER["REQUEST_METHOD"] == 'POST') {

    $data = json_decode(file_get_contents('php://input',true));
//    echo json_encode($data['username']);
   $username = $data->username;
   $password=$data->password;
   

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

    $query = "SELECT id FROM employee WHERE username = ? and password = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$username,$password]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) == 1) {
        $response["message"] = "LoggedIn Successfully!";
        $response["data"] = $result[0]["id"];
        $response["status"]=true;
        echo json_encode($response);
        exit;
    }
    else{
        $response["status"] = false;
        $response["message"] = "No user with this Username & Password";
        echo json_encode($response);
        exit;
    }

    
}

$response["status"] = false;
$response["message"] = "Only POST request are accepted.";
echo json_encode($response);
exit;
?>

