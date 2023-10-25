<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $query = "select * from categories;";
        $statement = $pdo->prepare($query);
        $statement->execute([]);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (!count($result) > 0) {
            $response["message"] = "*Unable to fetch details";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        }

        $query1 = "select * from products where categories_id=? or categories_id=? order by random() limit ?;";
        $statement1 = $pdo->prepare($query1);
        $statement1->execute([1, 3, 5]);
        $result1 = $statement1->fetchAll(PDO::FETCH_ASSOC);
        if (!count($result1) > 0) {
            $response["message"] = "*Unable to first fetch details";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        }

        $query2 = "select * from products where categories_id=? or categories_id=? order by random() limit ?;";
        $statement2 = $pdo->prepare($query2);
        $statement2->execute([3, 2, 5]);
        $result2 = $statement2->fetchAll(PDO::FETCH_ASSOC);
        if (!count($result2) > 0) {
            $response["message"] = "*Unable to second fetch details";
            $response["status"] = false;
            echo json_encode($response);
            exit;
        } else {
            $response["message"] = "Categories fetched successfully";
            $response["status"] = true;
            $response["data"] = $result;
            $response["groceryAndFashion"] = $result1;
            $response["mobilesAndFashion"] = $result2;
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
