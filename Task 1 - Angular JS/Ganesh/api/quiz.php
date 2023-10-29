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

$query = "SELECT id, question
FROM questions
LIMIT 10
";
$statement = $pdo->prepare($query);
$statement->execute();
$questions = $statement->fetchAll(PDO::FETCH_ASSOC);

if(!$questions){
    responseError("Data is unavailable ! ");
    exit;
}

$answers = []; 
foreach($questions as $question => $val){

    $query = "SELECT question_id, option, answer
    FROM answers
    WHERE question_id = ?";
    $statement = $pdo->prepare($query);
    $statement->execute([$val['id']]);   
    array_push($answers, $statement->fetchAll(PDO::FETCH_ASSOC));
    
}

if(!$questions){
    responseError("Data is unavailable ! ");
    exit;
}

echo responseSuccess("OK", [$questions, $answers]);
exit;

?>