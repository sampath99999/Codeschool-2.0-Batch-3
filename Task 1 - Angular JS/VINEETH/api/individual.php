<?php

require_once './dbconfig.php';
$post = file_get_contents('php://input');
$json = json_decode($post, true);
$pdo=getPDO();
if($json['id']){
   $sql='select * from products where id=?';
   $smt=$pdo->prepare($sql);
   $smt->execute(array($json['id']));
   $result=$smt->fetchAll(PDO::FETCH_ASSOC);
   echo json_encode($result);
}
else{
   echo 'id is not defined';
}