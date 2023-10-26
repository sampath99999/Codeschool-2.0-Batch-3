<?php

require_once "./dbConfig.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (empty($_POST["name"])) {
        http_response_code(400);
        echo "*Product name is not configured in your call";
        exit;
    }

    if (empty($_POST["price"])) {
        http_response_code(400);
        echo "*Product price is not configured in your call";
        exit;
    }

    if (empty($_POST["offer"])) {
        http_response_code(400);
        echo "*Product offer is not configured in your call";
        exit;
    }

    if (empty($_POST["id"])) {
        http_response_code(400);
        echo "*Product Id is not configured in your call";
        exit;
    }

    $id=$_POST["id"];
    $name=$_POST["name"];
    $price=$_POST["price"];
    $offer=$_POST["offer"];

    try {
        $pdo = getPDO();
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->beginTransaction();
        $query = "update products set name=?,price=?,offer=? where id=?";
        $statement = $pdo->prepare($query);
        $result=$statement->execute([$name,$price,$offer,$id]);

        if (!$result) {
            $response["message"] = "*Unable to update product details";
            $response["status"] = false;
            echo json_encode($response);
            $pdo->rollBack();
            exit;
        }
        else {
            $response["message"] = "Product updated successfully";
            $response["status"] = true;
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
    echo "*Unauthorized connection request";
}
