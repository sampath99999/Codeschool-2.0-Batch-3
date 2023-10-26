<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $urlParams = explode('/', $url);
    if (isset($urlParams[0])) {
        $categoryId = (int)$urlParams[count($urlParams) - 1];
    }

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query = "select c.id as company_id,c.name as company_name,p.id,p.name,price,product_link,offer,(price-(price*offer)/100) as current_price,rating from products as p inner join companies c on p.companies_id=c.id where p.categories_id=?;";
        $statement = $pdo->prepare($query);
        $statement->execute([$categoryId]);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (!count($result) > 0) {
            $response["message"] = "*Unable to fetch details";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        }

        $query1 = "select distinct c.id,c.name from products as p inner join companies as c on p.companies_id=c.id where p.categories_id=?;";
        $statement1 = $pdo->prepare($query1);
        $statement1->execute([$categoryId]);
        $result1 = $statement1->fetchAll(PDO::FETCH_ASSOC);

        if (!count($result1) > 0) {
            $response["message"] = "*Unable to fetch details";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        } else {
            $response["message"] = "Products fetched successfully";
            $response["status"] = true;
            $response["data"] = $result;
            $response["companies"] = $result1;
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
