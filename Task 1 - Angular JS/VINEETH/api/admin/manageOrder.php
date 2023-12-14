<?php

require_once '../dbconfig.php';
$pdo=getPDO();
$response=['status'=>false,'message'=>''];
$query="SELECT * FROM orders
INNER JOIN users ON orders.user_id = users.id
INNER JOIN order_details ON orders.orderid = order_details.order_id
INNER JOIN products ON order_details.product_id = products.id;
";
$smt=$pdo->prepare($query);
$result=$smt->execute();
if(!empty($result)){
    $result=$smt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
    exit;
}
else{
    $response['message']='No data found!';
    echo json_encode($response);
    exit;
}