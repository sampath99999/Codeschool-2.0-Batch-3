<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';

$jsonData = file_get_contents('php://input');

$postData = json_decode($jsonData, true);

$response = ["status" => false, "message" => ""];

if (empty($postData['token'])) {
    $response['message'] = "Id is not present";
}
else {
    try {
        $token = $postData['token'];
        $query = "SELECT user_id FROM users WHERE token = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$token]);
        $result = $stmt->fetch();
        $user_id = $result['user_id'];


    $query = $pdo->prepare("
            SELECT
                o.order_id,
                p.title AS product_name,
                od.quantity,
                od.unit_price
            FROM
                orders o
            JOIN
                orderdetails od ON o.order_id = od.order_id
            JOIN
                products p ON od.product_id = p.id
            WHERE
                o.customer_id = :user_id
        ");

        $query->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $query->execute();

        $results = $query->fetchAll(PDO::FETCH_ASSOC);

        $response = array();
        foreach ($results as $row) {
            $order = array(
                "order_id" => $row['order_id'],
                "product_name" => $row['product_name'],
                "quantity" => $row['quantity'],
                "unit_price" => number_format($row['unit_price'], 2)
            );

            $response[] = $order;
        }
        echo json_encode($response);
    } catch (PDOException $e) {
        echo json_encode(array("error" => $e->getMessage()));
    }

}
