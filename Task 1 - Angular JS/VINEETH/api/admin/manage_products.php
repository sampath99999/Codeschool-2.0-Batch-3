<?php

require_once '../dbconfig.php';
$pdo=getPDO();
$post = file_get_contents('php://input');
$json = json_decode($post, true);
$response=['status'=>false,'message'=>''];


$sql='select * from products inner join categories on products.category_id=categories.cat_id order by products.id ';
$smt=$pdo->prepare($sql);
$smt->execute();
$result=$smt->fetchAll(PDO::FETCH_ASSOC);
if(!empty($result)){
    $response['status']=true;
    echo json_encode($result);
}
else{
    $response['message']="Missing product ID";
    echo json_encode($response);
}