<?php

    require_once "./response.php";

    define("DB_HOST", "localhost");
    define("DB_PORT", "5432");
    define("DB_NAME", "quiz_data_management");
    define("DB_USERNAME", "postgres");
    define("DB_PASSWORD", "postgres");

    try {
        $pdo = new PDO("pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";user=" . DB_USERNAME . ";password=" . DB_PASSWORD);

        if (!$pdo) {
            http_response_code(400);
            echo responseError("Database Not Connected!");
            exit;
        }

    }
    catch(\Exception $e) {
        http_response_code(400);
        echo responseError("Database Connection Error!");
        exit;
    }

?>