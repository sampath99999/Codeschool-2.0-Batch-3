<?php

require_once './dbconfig.php';
$pdo=getPDO();
$post = file_get_contents('php://input');
$json = json_decode($post, true);
if($json['id']){
    $sql='SELECT products.productname,order_details.product_quantity,products.price,orders.date_time from orders inner join order_details 
     on orders.orderid=order_details.order_id
     inner join products on  products.id=order_details.product_id
    where orders.user_id=?';
    $smt=$pdo->prepare($sql);
    $smt->execute([$json['id']]);
    $result=$smt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
}