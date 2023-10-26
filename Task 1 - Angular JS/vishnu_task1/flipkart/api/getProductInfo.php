<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $urlParams = explode('/', $url);
    if (isset($urlParams[0])) {
        $productId = (int)$urlParams[count($urlParams) - 1];
    }

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "select name,price,offer from products where id=?";
        $statement = $pdo->prepare($query);
        $statement->execute([$productId]);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (!count($result) > 0) {
            $response["message"] = "*Unable to fetch details";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        }
        else{
            $response["message"] = "*Product fetching successful";
            $response["status"] = true;
            $response["data"]=$result;
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
