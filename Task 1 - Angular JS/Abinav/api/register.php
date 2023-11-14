<?php
require_once "./dbConfig.php";
$response = ["status" => false, "message" => "", "data" => null];
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $data["firstName"];
    $lastName = $data["lastName"];
    $email = $data["email"];
    $password = md5($data["password"]);

    function validateFirstName($firstName) {
        global $response;

        if (empty($firstName)) {
            $response["status"] = "false";
            $response["data"] = "First name is required.";
            exit;
        }
        if (strlen($firstName) < 3) {
            $response["status"] = "false";
            $response["data"] = "First name should have a minimum of three characters.";
            exit;
        }
        if (!preg_match("/^[a-zA-Z ]*$/", $firstName)) {
            $response["status"] = "false";
            $response["data"] = "First name can only contain letters";
            exit;
        }
        return "";
    }

    function validateLastName($lastName) {
        global $response;
        if (empty($lastName)) {
            $response["status"] = "false";
            $response["data"] = "Last name is required.";
            exit;
        }
        if (strlen($lastName) < 3) {
            $response["status"] = "false";
            $response["data"] = "Last name should have a minimum of three characters.";
            exit;
        }
        if (!preg_match("/^[a-zA-Z ]*$/", $lastName)) {
            $response["status"] = "false";
            $response["data"] = "Last name can only contain letters";
            exit;
        }
        return "";
    }

    function validateEmail($email) {
        global $response;
        if (empty($email)) {
            $response["status"] = "false";
            $response["data"] = "Email is required.";
            exit;
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response["status"] = "false";
            $response["data"] = "Enter a valid email address";
            exit;
        }
        return "";
    }

    function validatePassword($password) {
        global $response;
        if (empty($password)) {
            $response["status"] = "false";
            $response["data"] = "Password is required.";
            exit;
        }
        if (strlen($password) < 8) {
            $response["status"] = "false";
            $response["data"] = "Password should have a minimum of 8 characters.";
            exit;
        }
        return "";
    }

    $firstNameError = validateFirstName($firstName);
    $lastNameError = validateLastName($lastName);
    $emailError = validateEmail($email);
    $passwordError = validatePassword($password);

    if ($firstNameError || $lastNameError || $emailError || $passwordError) {
        $response["message"] = "Validation errors";
        $response["data"] = [
            "firstNameError" => $firstNameError,
            "lastNameError" => $lastNameError,
            "emailError" => $emailError,
            "passwordError" => $passwordError
        ];
    } else {
        $pdo = getPDO();
        $pdo->beginTransaction();
        $query = "SELECT email FROM users WHERE email = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$email]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $response["message"] = "Email already taken!";
        } else {
            $query = "INSERT INTO users (first_name, last_name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";
            $statement = $pdo->prepare($query);
            $result = $statement->execute([$firstName, $lastName, $email, $password]);

            if ($result) {
                $pdo->commit();
                $response["message"] = "Registration successfully==.";
                $response["status"] = true;
            } else {
                $pdo->rollBack();
                $response["message"] = "Error inserting data: ";
            }
        }
    }
} else {
    $response["message"] = 'Only POST requests are accepted';
}

echo json_encode($response);
