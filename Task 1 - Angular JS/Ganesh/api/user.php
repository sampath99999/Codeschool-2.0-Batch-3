<?php

require_once "./dbConfig.php";
require_once "./util.php";

$data = json_decode(file_get_contents('php://input'), true);

$userData = getUserSession($pdo, $data['token']);

if(!$userData){
    echo responseError("User is not present ! ");
    exit;
}

$userId = $userData[0]['user_id'];

$query = "SELECT role_id
FROM users
WHERE id = ?
";
$statement = $pdo->prepare($query);
$statement->execute([$userId]);
$userRole = $statement->fetchAll(PDO::FETCH_ASSOC);

if(!$userRole){
    echo responseError("User is not present ! ");
    exit;
}

echo responseSuccess("user", $userRole);
exit;


?>