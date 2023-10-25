<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => "", "data" => ""];

$query = "SELECT
p.party_name,
t.party_id,
SUM( tp.price) AS total_amount
FROM Transactions t
JOIN Parties p ON t.party_id = p.id
JOIN Transaction_Products tp ON t.id = tp.transaction_id
WHERE p.party_type = 'Client'  
AND EXTRACT(MONTH FROM t.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
GROUP BY t.party_id, p.party_name
ORDER BY total_amount DESC
LIMIT 5;



";

$stmt =  $pdo->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (!$result) {
    $response["status"] = false;
    $response["message"] = "No data found";
    echo json_encode($response);
    exit;
}
$response["status"] = true;
$response["message"] = "";
$response["data"] = $result;

echo json_encode($response);
