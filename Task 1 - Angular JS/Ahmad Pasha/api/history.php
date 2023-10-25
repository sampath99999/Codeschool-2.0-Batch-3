<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (!isset($_GET['id'])) {
        $response["message"] = "UserId is missing!";
        echo json_encode($response);
        exit;
    }

    $userId = $_GET['id'];


    $query = "SELECT subjects.name as subjectName,levels.name as level, scores.score as score, time from scores INNER JOIN levels on levels.id=scores.level_id
    INNER JOIN subjects on scores.subject_id= subjects.id
    INNER JOIN users on users.id= scores.user_id
    WHERE users.id=?;";

    $statment = $pdo->prepare($query);
    $statment->execute([$userId]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
}
