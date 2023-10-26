<?php
require_once "dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => ""];

    if (!isset($_POST["subject_id"])) {
        $response["message"] = "SubjectId is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["level_id"])) {
        $response["message"] = "levelId is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["score"])) {
        $response["message"] = "score is required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["user_id"])) {
        $response["message"] = "userId is required!";
        echo json_encode($response);
        exit;
    }

    $SubjectId = $_POST["subject_id"];
    $levelId = $_POST["level_id"];
    $score = $_POST['score'];
    $userId = $_POST['user_id'];

    if ($SubjectId == '' || $levelId == '' ||   $score == '' || $userId == '') {
        $response["message"] = "SubjectId,levelId,Score&userId  shouldn't be empty";
        echo json_encode($response);
        exit;
    }


    $query = "INSERT INTO scores(user_id,score,level_id,subject_id,time) VALUES(?,?,?,?,now());";

    $statment = $pdo->prepare($query);
    $result = $statment->execute([$userId, $score, $levelId, $SubjectId]);

    if (!$result) {
        $response["message"] = $statment->errorInfo();
        echo json_encode($response);
    }

    $response["status"] = true;
    $response["message"] = "Successfully Entered!";
    echo json_encode($response);
    exit;
}

$response["message"] = "ONLY POST method Accepted";
echo json_encode($response);
