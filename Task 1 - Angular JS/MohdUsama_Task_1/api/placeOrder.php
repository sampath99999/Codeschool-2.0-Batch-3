<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';

$jsonData = file_get_contents('php://input');

$response = ["status" => false, "message" => ""];

$postData = json_decode($jsonData, true);

if (empty($postData['token']) || empty($postData['total_amount'])) {
    $response['message'] = "Token and total amount are required.";
} else {
    $token = $postData['token'];
    $total_amount = $postData['total_amount'];
    try {
        $query = "SELECT user_id FROM users WHERE token = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$token]);
        $result = $stmt->fetch();

        if ($result && $result['user_id']) {
            $customer_id = $result['user_id'];
            $order_date = date("Y-m-d H:i:s");
            $pdo->beginTransaction();
            $query = "INSERT INTO orders (customer_id, order_date, total_amount) VALUES (?, ?, ?) RETURNING order_id";
            $stmt = $pdo->prepare($query);
            $stmt->execute([$customer_id, $order_date, $total_amount]);
            $result = $stmt->fetch();
            $order_id = $result['order_id'];
            foreach ($postData['items'] as $cartItem) {
                $product_id = $cartItem['id'];
                $unit_price = $cartItem['price'];
                $quantity = $cartItem['quantity'];
                $query = "INSERT INTO orderdetails (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)";
                $stmt = $pdo->prepare($query);
                $stmt->execute([$order_id, $product_id, $quantity, $unit_price]);
            }
            $pdo->commit();
            $response['status'] = true;
            $response['message'] = "Order placed successfully.";
        } else {
            $response['message'] = "Invalid token.";
        }
    } catch (Exception $e) {
        $pdo->rollBack();
        $response['message'] = "Error processing the request.";
        $response['error'] = $e->getMessage();
        $response['price'] = $unit_price;
    }
}
echo json_encode($response);
