<?php
require_once '../dbconfig.php';
$pdo=getPDO();
$response=['status'=>false,'message'=>''];
$query='select * from users';
$smt=$pdo->prepare($query);
$result=$smt->execute();
if($result){
    $result = $smt->fetchAll(PDO::FETCH_ASSOC);  
    $response['status']=true;
    echo json_encode($result);
    exit;
}
else{
    $response['message']='NO USERS!';
    echo json_encode($response);
    exit;
}
