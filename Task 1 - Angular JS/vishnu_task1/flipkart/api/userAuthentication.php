<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ["status" => false, "message" => "", "data" => null];
    if (empty($_POST["userEmail"])) {
        http_response_code(400);
        echo "*User email is not configured in your call";
        exit;
    }

    if (empty($_POST["userPassword"])) {
        http_response_code(400);
        echo "*User password is not configured in your call";
        exit;
    }

    $userEmail = $_POST["userEmail"];
    $userPassword = $_POST["userPassword"];

    $response = ["status" => true, "message" => "", "data" => null];

    if ($userEmail === '' || $userPassword === '') {
        http_response_code(400);
        $response["status"] = false;
        $response["message"] = "*User email & Password shouldn't be empty";
        echo json_encode($response);
        exit;
    }

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query = "select * from customers where email=? and (role=? or role=?) ";
        $statement = $pdo->prepare($query);
        $statement->execute([$userEmail, 1,2]);
        $user = $statement->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($userPassword, $user["password"])) {
            $response["message"] = "Logged In Successfully";
            $response["status"] = true;
            $data = ["id" => $user['id'], "role" => $user['role']];
            $serialized_data = serialize($data);
            $encrypted_string = openssl_encrypt($serialized_data, "AES-128-ECB", "rtY899@");
            $response["data"] = $encrypted_string;
            echo json_encode($response);
            exit;
        } else {
            $response["message"] = "*Username and password didn't match";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        }
    } catch (PDOException $e) {
        http_response_code(400);
        error_log($e->getMessage());
        // echo $e->getMessage();
        echo "*An unexpected error occurred. Please try again later.";
        exit;
    }
} else {
    http_response_code(400);
    echo "*Unauthorized connection request";
}
