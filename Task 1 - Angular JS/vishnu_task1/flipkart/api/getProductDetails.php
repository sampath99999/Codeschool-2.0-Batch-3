<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $urlParams = explode('/', $url);
    if (isset($urlParams[0])) {
        $productId = (int)$urlParams[count($urlParams) - 1];
    }

    $headers = getallheaders();

    if (isset($headers['Authorization'])) {
        $authorizationHeader = $headers['Authorization'];

        $authorizationArray = explode(' ', $authorizationHeader);

        if (count($authorizationArray) === 2 && strtolower($authorizationArray[0]) === 'bearer') {
            $token = $authorizationArray[1];
        }
    } else {
        $token = false;
    }

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


        $query = "select id,name,price,product_link,offer,(price-(price*offer)/100) as current_price,rating from products where id=?;";
        $statement = $pdo->prepare($query);
        $statement->execute([$productId]);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (!count($result) > 0) {
            $response["message"] = "*Unable to fetch details";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        }

        if ($token) {
            $userDetails = openssl_decrypt($token, "AES-128-ECB", "rtY899@");
            $userDetails = unserialize($userDetails);
            $query1 = "select district||' '||street||' '||dno||' '||state as address,id from customers where id=?;";
            $statement1 = $pdo->prepare($query1);
            $statement1->execute([$userDetails["id"]]);
            $result1 = $statement1->fetchAll(PDO::FETCH_ASSOC);

            if (!count($result1) > 0) {
                $response["message"] = "*Unable to fetch details";
                $response["status"] = false;
                echo json_encode($response);
                exit;
            } else {
                $response["message"] = "Address fetched successfully";
                $response["status"] = true;
                $response["data"] = $result;
                $response["address"] = $result1[0];
                echo json_encode($response);
                exit;
            }
        } else {
            $response["message"] = "Address fetched successfully";
            $response["status"] = true;
            $response["data"] = $result;
            $response["address"] = '';
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
