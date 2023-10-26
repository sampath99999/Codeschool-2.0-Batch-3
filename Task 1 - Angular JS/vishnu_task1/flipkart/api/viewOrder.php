<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    $headers = getallheaders();

    if (isset($headers['Authorization'])) {
        $authorizationHeader = $headers['Authorization'];

        $authorizationArray = explode(' ', $authorizationHeader);

        if (count($authorizationArray) === 2 && strtolower($authorizationArray[0]) === 'bearer') {
            $token = $authorizationArray[1];
        } else {
            echo "Invalid or unsupported token format";
        }
    } else {
        echo "Authorization header is missing";
    }

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //get customer ID
        $userDetails = openssl_decrypt($token, "AES-128-ECB", "rtY899@");
        $userDetails = unserialize($userDetails);
      
        $query1 = "select o.id,s.name,o.order_date,o.order_amount,s.phone from orders as o inner join customers as c on o.customers_id=c.id inner join shippers as s on o.shippers_id=s.id where c.id=?;";
        $statement1 = $pdo->prepare($query1);
        $statement1->execute([$userDetails["id"]]);
        $result1 = $statement1->fetchAll(PDO::FETCH_ASSOC);

        if (!count($result1) > 0) {
            $response["message"] = "*Unable to fetch details";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        } else {
            $response["message"] = "Orders fetched successfully";
            $response["status"] = true;
            $response["data"] = $result1;
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
