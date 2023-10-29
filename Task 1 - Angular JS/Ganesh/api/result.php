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

$count = 0;

foreach($data["quiz_data"]["answer"] as $choice){
    
    if($choice){
        $count++;
    }

}

$score = ($count/10) * 100;

$query = "SELECT id
FROM scores 
WHERE user_id = ?
";
$statement = $pdo->prepare($query);
$statement->execute([$userId]);
$userScore = $statement->fetchAll(PDO::FETCH_ASSOC);

// If user score is present update.

if($userScore){

    $query = "UPDATE scores
    SET topic_id = :topic, score = :score
    WHERE user_id = :user
    ";
    $statement = $pdo->prepare($query);
    $statement->execute([
        "user" => $userId,
        "topic" => 1,
        "score" => $score
    ]);
    $updatedScore = $statement->fetchAll(PDO::FETCH_ASSOC);

    if(!$updatedScore){
        echo responseError("Error while updating ! ");
        exit;
    }
    
    echo responseSuccess("Score Updated.", $score);
    exit;


}

// If user score is not present.

$query = "INSERT INTO scores(user_id, topic_id, score)
VALUES ( :user, :topic, :score )
";
$statement = $pdo->prepare($query);
$statement->execute([
    "user" => $userId,
    "topic" => 1,
    "score" => $score
]);
$insertedScore = $statement->fetchAll(PDO::FETCH_ASSOC);

if(!$insertedScore){
    echo responseError("Error while insertion ! ");
    exit;
}

echo responseSuccess("Score Added.", $score);
exit;

?>