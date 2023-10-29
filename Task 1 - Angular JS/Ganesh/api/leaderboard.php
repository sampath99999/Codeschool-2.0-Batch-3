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

$query = "SELECT users.id, users.first_name, users.last_name, scores.score, RANK () OVER ( 
    ORDER BY scores.score DESC
) user_rank 
FROM users 
INNER JOIN scores
ON users.id = scores.user_id
ORDER BY scores.score DESC
";
$statement = $pdo->prepare($query);
$statement->execute();
$leaderBoard = $statement->fetchAll(PDO::FETCH_ASSOC);

if(!$leaderBoard){
    echo responseError("Server Error ! ");
    exit;
}

echo responseSuccess("success", $leaderBoard);
exit;



?>