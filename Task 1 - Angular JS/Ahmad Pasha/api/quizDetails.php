<?php

require_once "./dbConfig.php";

if ($_SERVER["REQUEST_METHOD"] == 'GET') {

    $response = ["status" => false, "message" => "", "data" => null];
    if (!isset($_GET["subject_id"])) {
        $response["message"] = "sub Id is missing!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_GET["level_id"])) {
        $response["message"] = "level Id is missing!";
        echo json_encode($response);
        exit;
    }

    $subjectId = $_GET["subject_id"];
    $levelId = $_GET['level_id'];
  
    $query = "
    SELECT questions.name,options.first_option,OPTIONS.second_option,OPTIONs.third_option,OPTIONS.fouth_option,answers.answer
FROM questions
    INNER JOIN subjects on questions.subject_id = subjects.id
    INNER JOIN levels on questions.level_id = levels.id
    INNER JOIN options on questions.id = options.question_id
    INNER JOIN answers on answers.question_id = questions.id
    WHERE levels.id=? and subjects.id=?";

    $statment = $pdo->prepare($query);
    $statment->execute([$levelId, $subjectId]);
    $user = $statment->fetchAll(PDO::FETCH_ASSOC);


    if (count($user) >= 1) {
        $response["message"] = "Success";
        $response["status"] = true;
        $response["data"] = $user;
        echo json_encode($response);
        exit;
    } else {
        $response["status"] = false;
        $response["message"] = "Page not found!";
        echo json_encode($response);
        exit;
    }
}
