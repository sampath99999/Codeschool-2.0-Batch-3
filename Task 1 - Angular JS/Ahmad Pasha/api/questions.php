<?php
require_once "dbConfig.php";


if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    $response = ["status" => false, "message" => "", "data" => null];

    if (!isset($_POST["question_name"])) {
        $response["message"] = "Question Name Is Required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["option_1"])) {
        $response["message"] = "Option_1 Is Required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["option_2"])) {
        $response["message"] = "Option_2 Is Required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["option_3"])) {
        $response["message"] = "Option_3 Is Required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["option_4"])) {
        $response["message"] = "Option_4 Is Required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["option_5"])) {
        $response["message"] = "Option_5 Is Required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["subject_id"])) {
        $response["message"] = "Subject Id Is Required!";
        echo json_encode($response);
        exit;
    }
    if (!isset($_POST["level_id"])) {
        $response["message"] = "Level Id Is Required!";
        echo json_encode($response);
        exit;
    }

    $questionName = $_POST["question_name"];
    $option_1 = $_POST["option_1"];
    $option_2 = $_POST["option_2"];
    $option_3 = $_POST["option_3"];
    $option_4 = $_POST["option_4"];
    $correctAnswer = $_POST["option_5"];
    $subjectId = $_POST["subject_id"];
    $levelId = $_POST["level_id"];


    $query = "SELECT id FROM questions WHERE name = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$questionName]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) == 1) {
        $response["message"] = "Question already Present!";
        echo json_encode($response);
        exit;
    }

    $query1 = "INSERT INTO questions (subject_id, level_id, name) VALUES (?, ?, ?)";
    $statement1 = $pdo->prepare($query1);
    $statement1->execute([$subjectId, $levelId, $questionName]);
    $result1 = $statement1->fetchAll(PDO::FETCH_ASSOC);

    $query2 = "INSERT INTO options (first_option,second_option,third_option,fouth_option)
VALUES (?,?,?,?)";
    $statement2 = $pdo->prepare($query2);
    $statement2->execute([$option_1, $option_2, $option_3, $option_4]);
    $result2 = $statement2->fetchAll(PDO::FETCH_ASSOC);

    $query3 = "INSERT INTO answers (answer) VALUES (?);";
    $statement3 = $pdo->prepare($query3);
    $statement3->execute([$correctAnswer]);
    $result3 = $statement3->fetchAll(PDO::FETCH_ASSOC);

    $response["status"] = true;
    $response["message"] = "Successfully Entered!";
    echo json_encode($response);
    exit;
}

$response["message"] = "ONLY POST method Accepted";
echo json_encode($response);
