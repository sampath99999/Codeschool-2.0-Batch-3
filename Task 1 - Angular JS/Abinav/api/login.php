<?php
    require_once "./dbConfig.php";
    $data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $data["email"];
    $password =md5($data["password"]);
    $response = ["status" => true, "message" => "", "data" => null,"token"=>null];

    function validateEmail($email) {
        global $response;
        if (empty($email)) {
            $response["status"]="false";
            $response["data"]="Email is required.";
            exit;
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response["status"]="false";
            $response["data"]="Enter valid email address";
            exit;
        }
            return "";
    }
    function validatePassword($password) {
        global $response;
        if (empty($password)) {
            $response["status"]="false";
            $response["data"]="Password is required.";
            exit;
        }
        if (strlen($password) < 8) {
            $response["status"]="false";
            $response["data"]="password should have a minimum of 8 characters.";
            exit;
        }
   };
   validateEmail($email);
   validatePassword($password);

   $pdo = getPDO();
   $pdo->beginTransaction();


    $query = "SELECT * FROM users WHERE email=? AND password=?";
    $statement = $pdo->prepare($query);
    $statement->execute([$email, $password]);
    $user = $statement->fetchAll(PDO::FETCH_ASSOC);
    $response["data"]=$user;

    $token = bin2hex(random_bytes(16));
    $query1 = "update users set token=?,updated_at=now() where email=?";
    $statement1 = $pdo->prepare($query1);
    $statement1->execute([$token,$email]);

    if (count($user) == 1) {
        $pdo->commit();
        $response["message"] = "LoggedIn Successfully!";
        $response["status"]=true;
        $response["token"]=$token;
        echo json_encode($response);
        exit;
    } else {
        $pdo->rollBack();
        $response["status"] = false;
        $response["message"] = "Invalid Email or Password";
        echo json_encode($response);
        exit;
    }
}
    echo 'only POST requests are accepted';
