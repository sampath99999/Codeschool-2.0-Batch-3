<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $urlParams = explode('/', $url);
    if (isset($urlParams[0])) {
        $orderId = (int)$urlParams[count($urlParams) - 1];
    }

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      
        $query1 = "select p.id,p.name,d.product_price from orders as o inner join order_details as d on o.id=d.orders_id inner join products as p on d.products_id=p.id where o.id=?;";
        $statement1 = $pdo->prepare($query1);
        $statement1->execute([$orderId]);
        $result1 = $statement1->fetchAll(PDO::FETCH_ASSOC);

        if (!count($result1) > 0) {
            $response["message"] = "*Unable to fetch details";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        } else {
            $response["message"] = "Order details fetched successfully";
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
