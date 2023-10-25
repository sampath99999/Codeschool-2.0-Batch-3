<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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



    if (empty($_POST["orderDetails"])) {
        http_response_code(400);
        echo "*User order is not configured in your call";
        exit;
    }


    $userOrder = $_POST["orderDetails"];
    $totalInsertions = 0;
    $deliveryFee = 50;

    $response = ["status" => true, "message" => "", "data" => null];

    if (count($userOrder) === 0) {
        http_response_code(400);
        $response["status"] = false;
        $response["message"] = "*There are no products in the order";
        echo json_encode($response);
        exit;
    }



    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->beginTransaction();

        //get shipperId
        $query = "select id from shippers order by random() limit 1;";
        $statement = $pdo->prepare($query);
        $statement->execute([]);
        $shipperId = $statement->fetchColumn();

        if (!$shipperId) {
            $response["message"] = "*Shipper is not available";
            $response["status"] = false;
            $pdo->rollBack();
            echo json_encode($response);
            exit;
        }

        //getCustomerID
        $userDetails = openssl_decrypt($token, "AES-128-ECB", "rtY899@");
        $userDetails = unserialize($userDetails);
        $userId = $userDetails["id"];

        $orderTotal = 0;

        foreach ($userOrder as $product) {
            $orderTotal += ($product["quantity"] * $product["price"]);
        }

        $orderTotal += $deliveryFee;



        //insert order in orders table
        $query = "insert into orders(customers_id,shippers_id,order_amount)values(?,?,?) returning id";
        $statement1 = $pdo->prepare($query);
        $statement1->execute([$userId, $shipperId, $orderTotal]);
        $orderId = $statement1->fetchColumn();

        if (!$orderId) {
            $response["message"] = "*Unable to place order";
            $response["status"] = false;
            $pdo->rollBack();
            echo json_encode($response);
            exit;
        }

        function productOrderMapping($id, $orderId, $price, $quantity, $pdo)
        {
            $query = "insert into order_details(orders_id,products_id,product_price,quantity)values(?,?,?,?) returning id";
            $statement2 = $pdo->prepare($query);
            $result = $statement2->execute([$orderId, $id, $price, $quantity]);
            if (!$result) {
                $response["message"] = "*Unable to map product to order";
                $response["status"] = false;
                $pdo->rollBack();
                echo json_encode($response);
                exit;
            } else {
                return 1;
            }
        }
        //order products mapping
        foreach ($userOrder as $product) {
            $totalInsertions += productOrderMapping($product["id"], $orderId, $product["price"], $product["quantity"], $pdo);
        }
        if ($totalInsertions == count($userOrder)) {
            $response["message"] = "*product mapping successful";
            $response["status"] = true;
            $pdo->commit();
            echo json_encode($response);
            exit;
        } else {
            $response["message"] = "*product mapping failed";
            $response["status"] = false;
            $pdo->rollBack();
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
    echo "*Sorry for the inconvience we will get back to you";
}
