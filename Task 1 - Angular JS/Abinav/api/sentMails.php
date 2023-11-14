<?php
    require_once "./dbConfig.php";
    require_once "./auth.php";
    $data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = $data["id"];
    $mailType='sent';
    $response = ["status" => false, "message" => "", "data" => null];
    $pdo = getPDO();
    $pdo->beginTransaction();

    $query = "SELECT messages.*,users.first_name,users.last_name FROM  messages LEFT JOIN users on messages.receiver_id=users.id WHERE sender_id=? AND mail_type=? ORDER BY id DESC";
    $statement = $pdo->prepare($query);
    $statement->execute([$userId,$mailType]);
    $result=$statement->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        $pdo->commit();
        $response["message"] = "Data Fetched successfully.";
        $response["status"] = true;
        $response["data"] = $result;
        echo json_encode($response);
        exit;
    } else {
        $pdo->rollBack();
        $response["message"] = "Error in Fetching  data: ";
        $response["status"]=401;

    }
}
    echo 'only POST requests are accepted';
