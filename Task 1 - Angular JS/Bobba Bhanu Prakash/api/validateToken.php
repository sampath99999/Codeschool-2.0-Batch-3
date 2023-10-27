<?php
$headers = getallheaders();
$token = $headers['Authorization'];
$query = "select * from tokens where token=:token";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':token', $token);
$stmt->execute();
$noOfToken = $stmt->fetchAll(PDO::FETCH_ASSOC);
if (sizeof($noOfToken) == 0) {
    $response["status"] = false;
    $response["message"] = "User is not authenticate";
    echo json_encode($response);
    exit;
}
