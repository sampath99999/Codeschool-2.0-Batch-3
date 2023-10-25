<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';

$query = "SELECT p.id,p.title,p.description,p.image,p.price,p.category_id,c.name From products p LEFT JOIN categories c on c.id = p.category_id";

$stmt = $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$jsonResult = json_encode($result);
if (count($result) === 0) {
    $jsonResult = json_encode(["status"=>false,"message" => "No data found"]);
}

echo $jsonResult;
?>
