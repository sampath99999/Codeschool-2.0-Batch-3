<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (!isset($_GET['subject_id'])) {
        $response["message"] = "UserId is missing!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_GET['level_id'])) {
        $response["message"] = "UserId is missing!";
        echo json_encode($response);
        exit;
    }

    $subjectId = $_GET['subject_id'];
    $levelId = $_GET['level_id'];

    $query = "SELECT users.name as username,subjects.name as subjectName,levels.name as level, scores.score as score, time from scores INNER JOIN levels on levels.id=scores.level_id
    INNER JOIN subjects on scores.subject_id= subjects.id
    INNER JOIN users on users.id= scores.user_id
    WHERE subjects.id=? AND levels.id=?
    ORDER BY scores.score DESC,scores.time DESC
    LIMIT 5;";

    $statment = $pdo->prepare($query);
    $statment->execute([$subjectId, $levelId]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);

    $response["message"] = "Success";
    $response["status"] = true;
    $response["data"] = $user;
    echo json_encode($response);
    exit;
}
