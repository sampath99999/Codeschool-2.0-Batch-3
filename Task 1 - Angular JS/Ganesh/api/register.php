<?php

require_once "./dbConfig.php";
require_once "./util.php";

$data = json_decode(file_get_contents('php://input'), true);


// Validation for the manditory user input.
function userInputValidation($input)
{
    if (empty($input)) {
        http_response_code(406);
        echo responseError("Please select the input !");
        exit;
    } else {
        $response = responseSuccess("", $input);
        return $response;
    }
}

// Validation for the email.
function userEmailVaildation($email)
{
    if (empty($email)) {
        http_response_code(406);
        echo responseError("Email is required !");
        exit;
    } elseif (!(preg_match("/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]{2,})\.([a-zA-Z]{2,5})$/", $email))) {
        http_response_code(406);
        echo responseError("Email domain is invalid !");
        exit;
    } else {
        $response = responseSuccess('', $email);
        return $response;
    }
}

// Validation for the strong password.
function userPasswordVaildation($password)
{
    $strongPassRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/';
    if (empty($password)) {
        http_response_code(406);
        echo responseError("Password is required !");
        exit;
    } elseif (!(preg_match($strongPassRegex, $password))) {
        http_response_code(406);
        echo responseError("Email domain is invalid !");
        exit;
    } else {
        $response = responseSuccess('', $password);
        return $response;
    }
}


if (!$data) {
    http_response_code(406);
    echo responseError("Input is required ! ");
    exit;
}

// Validation count.
$validation = array();
$count = 0;



// Get individual values.
$firstName = json_decode(userInputValidation($data['first_name']));
$lastName = json_decode(userInputValidation($data['last_name']));
$interests = json_decode(userInputValidation($data['interests']));
$username = json_decode(userEmailVaildation($data['username']));
$password = json_decode(userPasswordVaildation($data['password']));
$role = 2;

// echo json_encode($firstName);

array_push($validation, $firstName->status);
array_push($validation, $lastName->status);
array_push($validation, $interests->status);
array_push($validation, $username->status);
array_push($validation, $password->status);

foreach ($validation as $val) {
    if ($val) {
        $count++;
    }
}

// On Unsuccessful validations.
if ($count != count($validation)) {
    http_response_code(406);
    echo responseError("Fill all the input fields correctly !");
    exit;
}

// Check if user already exist.
$userPresent = getUser($pdo, $username->data);

// Check whether user already exist in the DB.
if ($userPresent) {
    http_response_code(409);
    echo responseError("User already exist! Simply login to website");
    exit;
}
try{

    $pdo->beginTransaction();

    // On no duplicates...
    // Insert the user data.
    $query = "INSERT INTO
    users( first_name, last_name, username, password, role_id )
    VALUES ( :first_name, :last_name, :user_name, :user_password, :user_role_id )";
    $statement = $pdo->prepare($query);
    $statement->execute([
        'first_name' => $firstName->data,
        'last_name' => $lastName->data,
        'user_name' => $username->data,
        'user_password' => $password->data,
        'user_role_id' => $role
    ]);
    $userInsertion = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Error while inserting data.
    if (!$userInsertion) {
        http_response_code(501);
        responseError($statement->errorInfo());
        exit;
    }

    $newUser = getUser($pdo, $username->data);

    $count = 1;
    $topicId = [];
    foreach($interests->data as $interest){
        if($interest){
            array_push($topicId, $count);
        }
        $count++;
    }

    foreach($topicId as $topic){
        // Insert the user data.
        $query = "INSERT INTO
        user_interests( user_id, topic_id )
        VALUES ( :user, :topic )";
        $statement = $pdo->prepare($query);
        $statement->execute([
            "user" => $newUser[0]['id'],
            "topic" => $topic
        ]);  
    }
    $interestInsertion = $statement->fetchAll(PDO::FETCH_ASSOC);

    if(!$interestInsertion){
        http_response_code(500);
        echo responseError("Error while adding the user interests");
        exit;
    }

    $pdo->commit();

}catch(\Exception $e){
    $pdo->rollBack();
}


// On successful data insertion.
http_response_code(200);
echo responseSuccess("Registration Successful! You are redirected to login page in 3 seconds please wait.", "");
exit;


?>