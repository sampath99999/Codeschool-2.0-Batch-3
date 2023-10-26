<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $urlParams = explode('/', $url);
    if (isset($urlParams[0])) {
        $categoryId = (int)$urlParams[count($urlParams) - 1];
    }

    $minimumPrice = (int)$_GET['minimum'];
    $maximumPrice = (int)$_GET['maximum'];
    $rating = $_GET['rating'];
    $companiesParam = $_GET['companies'];

    if (!empty($companiesParam)) {
        $companies = explode(',', $companiesParam);
    } else {
        $companies = [];
    }

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query = '';
        $companyParameters = array();
        foreach ($companies as $index => $company) {
            $paramName = ':company' . $index;
            $companyParameters[] = $paramName;
        }
        $placeholders = implode(',', $companyParameters);

        if ($maximumPrice != 1000) {
            $query = "SELECT id, name, price, product_link, offer, (price - (price * offer) / 100) as current_price, rating FROM products WHERE rating >= :rating AND (price - (price * offer) / 100) >= :minPrice AND (price - (price * offer) / 100) <= :maxPrice";
            $query .= " AND companies_id IN ($placeholders)";
        } else {
            $query = "SELECT id, name, price, product_link, offer, (price - (price * offer) / 100) as current_price, rating FROM products WHERE rating >= :rating AND ((price - (price * offer) / 100) >= :minPrice OR (price - (price * offer) / 100) >= :maxPrice)";
            $query .= " AND companies_id IN ($placeholders)";
        }


        if (empty($companies)) {
            $query = "SELECT id, name, price, product_link, offer, (price - (price * offer) / 100) as current_price, rating FROM products WHERE rating >= :rating AND ((price - (price * offer) / 100) >= :minPrice OR (price - (price * offer) / 100) >= :maxPrice)
            AND categories_id=:categoryId;";
        }

        $statement = $pdo->prepare($query);

        $statement->bindValue(':rating', $rating, PDO::PARAM_INT);
        $statement->bindValue(':minPrice', $minimumPrice, PDO::PARAM_INT);
        $statement->bindValue(':maxPrice', $maximumPrice, PDO::PARAM_INT);

        if (empty($companies)) {
            $statement->bindValue(':categoryId', $categoryId, PDO::PARAM_INT);
        }

        foreach ($companies as $index => $company) {
            $paramName = ':company' . $index;
            $statement->bindValue($paramName, $company, PDO::PARAM_INT);
        }


        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (!count($result) > 0) {
            $response["message"] = "*Unable to fetch details";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        } else {
            $response["message"] = "Products fetched successfully";
            $response["status"] = true;
            $response["data"] = $result;
            $response["category"] = $categoryId;
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
