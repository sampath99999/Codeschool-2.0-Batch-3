<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
require_once 'validateToken.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
if (!isset($data["id"])) {
    $response['status'] = false;
    $response['message'] = 'Id is not present';
    echo json_encode($response);
    exit;
}
$id = $data['id'];
$response = ["status" => false, "message" => "", "data" => ""];
$query = "select hd.*,b.year as budget_year,hs.status,h.type as hod_type from hoa_details hd 
left join budget_years b on b.id=hd.budget_year_id
left join hoa_status hs on hd.status_id=hs.id
left join hods h on h.id=hd.hod_id where hd.id=?";
$stmt = $pdo->prepare($query);
if ($stmt->execute([$id])) {
    $response['data'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response["status"] = true;
}
echo json_encode($response);
