<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (empty($_REQUEST["userName"])) {
        http_response_code(400);
        echo "*User name is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["userPhoneNumber"])) {
        http_response_code(400);
        echo "*User phone number is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["userEmail"])) {
        http_response_code(400);
        echo "*User email is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["userPassword"])) {
        http_response_code(400);
        echo "*User password is not configured in your call";
        exit;
    }

    if (empty($_REQUEST["userConfirmPassword"])) {
        http_response_code(400);
        echo "*Confirm password is not configured in your call";
        exit;
    }
    if (empty($_REQUEST["userPincode"])) {
        http_response_code(400);
        echo "*User pincode is not configured in your call";
        exit;
    }
    if (empty($_REQUEST["userStreet"])) {
        http_response_code(400);
        echo "*User street is not configured in your call";
        exit;
    }
    if (empty($_REQUEST["userDno"])) {
        http_response_code(400);
        echo "*User dno is not configured in your call";
        exit;
    }
    if (empty($_REQUEST["userDistrict"])) {
        http_response_code(400);
        echo "*User district is not configured in your call";
        exit;
    }
    if (empty($_REQUEST["userState"])) {
        http_response_code(400);
        echo "*User state is not configured in your call";
        exit;
    }




    $userName = $_POST["userName"];
    $userPhoneNumber = $_POST["userPhoneNumber"];
    $userEmail = $_POST["userEmail"];
    $userPassword = $_POST["userPassword"];
    $userConfirmPassword = $_POST["userConfirmPassword"];
    $userPincode = $_POST["userPincode"];
    $userStreet = $_POST["userStreet"];
    $userDno = $_POST["userDno"];
    $userDistrict = $_POST["userDistrict"];
    $userState = $_POST["userState"];

    function validateInput($input, $pattern, $errorMessage)
    {
        if (!preg_match($pattern, $input)) {
            http_response_code(400);
            echo $errorMessage;
            exit;
        }
    }

    validateInput($userName, '/^[A-Z][a-z\s]{1,20}$/', "*Incorrect username");
    validateInput($userPhoneNumber, '/^[0-9]{10}$/', "*Invalid phone number");
    validateInput($userEmail, '/^[a-zA-Z0-9]+(?:[._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', "*Incorrect email");
    validateInput($userPassword, '/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$%#@!~&^()])[a-zA-Z0-9$%#@!~&^()]+$/', "*Password didn't meet criteria.");

    if ($userPassword !== $userConfirmPassword) {
        http_response_code(400);
        echo "*Password didn't match";
        exit;
    }


    //password hashing
    $userPassword = password_hash($userPassword, PASSWORD_DEFAULT);

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->beginTransaction();
        //check user exists or not
        $checkUserquery = "select count(*) from customers where email=?";
        $statement1 = $pdo->prepare($checkUserquery);
        $statement1->execute([$userEmail]);
        $result1 = $statement1->fetchColumn();

        if ($result1 > 0) {
            $response["message"] = "*User already exists";
            $response["status"] = false;
            echo json_encode(($response));
            $pdo->rollBack();
            exit;
        }



        //insert user into database
        $insertUserquery = "insert into customers(name,phone,email,password,pincode,street,dno,district,state) values (?,?,?,?,?,?,?,?,?) returning id;";
        $statement2 = $pdo->prepare($insertUserquery);
        $result2 = $statement2->execute([$userName, $userPhoneNumber, $userEmail, $userPassword, $userPincode, $userStreet, $userDno, $userDistrict, $userState]);

        if (!$result2) {
            $response["message"] = "*User creation failed";
            $response["status"] = false;
            echo json_encode($response);
            $pdo->rollBack();
            exit;
        } else {
            $response["message"] = "*User creation successful";
            $response["status"] = true;
            $response["data"] = "inserted";
            echo json_encode($response);
            $pdo->commit();
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
    echo "*Connection request failed";
    exit;
}
