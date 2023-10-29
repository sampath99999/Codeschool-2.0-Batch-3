<?php

use function PHPSTORM_META\type;

require_once "./dbConfig.php";
    
$data = json_decode(file_get_contents('php://input'), true);

if(!$data){
    echo responseError("Data is unavailable.");
    exit;
}


$query = "INSERT INTO questions(topic_id, question)
VALUES (:topic, :question)";    
$statement = $pdo->prepare($query);
$statement->execute([
    "topic" => $data['topic'],
    "question" => $data['question']
]);
$questionInserted = $statement->fetchAll(PDO::FETCH_ASSOC);

if(!$questionInserted){
    echo responseError("Question Insertion Error.");
    exit;
}

$query = "SELECT id
FROM questions
WHERE question = ?";    
$statement = $pdo->prepare($query);
$statement->execute([$data['question']]);
$question = $statement->fetchAll(PDO::FETCH_ASSOC);

if(!$question){
    echo responseError("Question ID Error.");
    exit;
}


for($index = 0; $index < 4; $index++){
    
    $query = "INSERT INTO answers(question_id, option, answer)
    VALUES (:id, :option, :answer)";    
    $statement = $pdo->prepare($query);
    $statement->execute([
        "id" => $question[0]['id'],
        "option" => $data['option'][$index],
        "answer" => json_encode($data['correct'][$index])
    ]);

}
$optionInserted = $statement->fetchAll(PDO::FETCH_ASSOC);

if(!$optionInserted){
    echo responseError("Option Insertion Error.");
    exit;
}

echo responseSuccess("Success", '');
exit;




?>