<?php

require_once '../dbconfig.php';
$pdo = getPDO();
$post = file_get_contents('php://input');
$json = json_decode($post, true);
$response = ['status' => false, 'message' => ''];

$query="update order_details
        SET status=? 
        where product_id=?";
$smt = $pdo->prepare($query);
$smt->bindParam(1, $json['status']);
$smt->bindParam(2, $json['id']);
$smt->execute();