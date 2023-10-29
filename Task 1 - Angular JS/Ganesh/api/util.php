<?php

function getUser($pdo, $username){
    // On success.
    $query = "SELECT id 
    FROM users 
    WHERE username = ?";
    $statement = $pdo->prepare($query);
    $statement->execute([$username]);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    return $result;
}

function getUserSession($pdo, $token){
    // Query for user session.
    $query = "SELECT user_id
    FROM sessions
    WHERE token = ?";
    $statment = $pdo->prepare($query);
    $statment->execute([$token]);
    $user_session = $statment->fetchAll(PDO::FETCH_ASSOC);
    return $user_session;
}
?>