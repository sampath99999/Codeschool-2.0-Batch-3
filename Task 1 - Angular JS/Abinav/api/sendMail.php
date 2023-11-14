<?php
require_once "./dbConfig.php";
require_once "./auth.php";
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sender_id = $data["sender_id"];
    $receiverMail = $data["receiverMail"];
    $message = $data["message"];
    $subject = $data["subject"];
    $mail_type = 'sent';
    $response = ["status" => false, "message" => "", "data" => null];

    $pdo = getPDO();
    $pdo->beginTransaction();

    $query1 = "SELECT id FROM users WHERE email=?";
    $stmt = $pdo->prepare($query1);
    $stmt->execute([$receiverMail]);
    $receiver = $stmt->fetch();

    if ($receiver) {
        $receiver_id = $receiver['id'];
        $query = "INSERT INTO messages (sender_id, receiver_id, message, subject, mail_type) VALUES (?, ?, ?, ?, ?)";
        $statement = $pdo->prepare($query);
        $result = $statement->execute([$sender_id, $receiver_id, $message, $subject, $mail_type]);

        if ($result) {
            $pdo->commit();
            $response["message"] = "Data inserted successfully.";
            $response["status"] = true;
        } else {
            $pdo->rollBack();
            $response["message"] = "Error inserting data: ";
        }
    } else {
        $response["message"] = "Invalid recipient mail address";
    }

    echo json_encode($response);
}
else {
    echo 'only POST requests are accepted';
}
