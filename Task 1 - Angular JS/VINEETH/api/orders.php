<?php
require './dbconfig.php';
$pdo=getPDO();
$post = file_get_contents('php://input');
$json = json_decode($post, true);
$user_id = $json['user_id'];
$cart = $json['cart'];
try {
    $no_of_products = count($cart);
    $total_price = 0;
    foreach ($cart as $item) {
        $total_price += $item['price'] * $item['quantity'];
    }
    $sql = "INSERT INTO orders (user_id,no_of_products,total_price) VALUES (?,?,?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user_id,$no_of_products,$total_price]);

    $order_id = $pdo->lastInsertId();
    $sql = "INSERT INTO order_details (order_id, product_id, product_price, product_quantity,status) VALUES (?, ?, ?, ?,?)";
    $stmt = $pdo->prepare($sql);
    $status='PENDING';
    foreach ($cart as $item) {
        $stmt->execute([$order_id, $item['id'], $item['price'], $item['quantity'],$status]);
    }
    echo "ORDER PLACED SUCCESSFULLY";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}