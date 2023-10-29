<?php

    require_once "./dbConfig.php";
    
    $data = json_decode(file_get_contents('php://input'), true);

    // Get individual values.
    $name = $data['username'];
    $password = $data['password'];

    if (empty($name)) {
        http_response_code(406);
        echo responseError("Please provide the username !");
        exit;
    }
    if (empty($password)) {
        http_response_code(406);
        echo responseError("Please provide the password !");
        exit;
    }

    // Check the user and authentication lookup.
    $query = "SELECT id,
    first_name,
    last_name,
    username,
    password, 
    role_id
    FROM users
    WHERE username = :username AND password = :password ";
    $statement = $pdo->prepare($query);
    $statement->execute([
        "username" => $name,
        "password" => $password
    ]);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    $role = $result[0]['role_id'];

    // Check whether user already exist in the DB.
    if (count($result) != 1) {
        http_response_code(406);
        echo responseError("Username or password is incorrect! Please try again.");
        exit;
    } else {
        // On success.
        // Generate token.
        $TOKEN = hash('sha256', $password);
        $userName = $result[0]['first_name'] . " " . $result[0]['last_name'];

        // Maintain user token and expiry.
        $query = "INSERT INTO sessions(user_id, token) 
                VALUES
                (?, ?)
        ";
        $statement = $pdo->prepare($query);
        $statement->execute([
            $result[0]['id'],
            $TOKEN
        ]);
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        // Error while inserting data.
        if (!$result) {
            http_response_code(501);
            echo responseError($statement->errorInfo());
            exit;
        }

        // On successful insertion of user session.
        http_response_code(200);
        echo responseSuccess("Login Successful. You are redirected to home page in 3 seconds please wait...", [$TOKEN, $userName, $role]);
        exit;

    }

?>