<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
require_once 'validateToken.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$response = ["status" => false, "message" => "", "data" => ""];
if (!isset($data['hod']) || empty($data['hod'])) {

    $response['status'] = false;
    $response['message'] = "HOD is not selected";
    echo json_encode($response);
    exit;
}
if (!isset($data['year']) || empty($data['year'])) {

    $response['status'] = false;
    $response['message'] = "Year is not selected";
    echo json_encode($response);
    exit;
}
if (!isset($data['scheme']) || empty($data['scheme'])) {

    $response['status'] = false;
    $response['message'] = "Scheme is not selected";
    echo json_encode($response);
    exit;
}
if (!isset($data['mjhDesc']) || empty($data['mjhDesc'])) {

    $response['status'] = false;
    $response['message'] = "Major head description is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['hoa']) || empty($data['hoa'])) {

    $response['status'] = false;
    $response['message'] = "HOA is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['smhDesc']) || empty($data['smhDesc'])) {

    $response['status'] = false;
    $response['message'] = "Sub major head description is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['mhDesc']) || empty($data['mhDesc'])) {

    $response['status'] = false;
    $response['message'] = "minor head description is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['gshDesc']) || empty($data['gshDesc'])) {

    $response['status'] = false;
    $response['message'] = "Group sub head description is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['shDesc']) || empty($data['shDesc'])) {

    $response['status'] = false;
    $response['message'] = "sub head description is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['dhDesc']) || empty($data['dhDesc'])) {

    $response['status'] = false;
    $response['message'] = "Detailed head description is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['sdhDesc']) || empty($data['sdhDesc'])) {

    $response['status'] = false;
    $response['message'] = "Sub Detailed head description is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['charged']) || empty($data['charged'])) {

    $response['status'] = false;
    $response['message'] = "Charged/Voted is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['amount'])) {

    $response['status'] = false;
    $response['message'] = "Amount is not present";
    echo json_encode($response);
    exit;
}
if (!isset($data['id']) || empty($data['id'])) {

    $response['status'] = false;
    $response['message'] = "Id is not present";
    echo json_encode($response);
    exit;
}
$id = $data['id'];
$hod = $data['hod'];
$hoa = $data['hoa'];
$amount = $data['amount'];
$sdhDesc = $data['sdhDesc'];
$dhDesc = $data['dhDesc'];
$charged = $data['charged'];
$shDesc = $data['shDesc'];
$gshDesc = $data['gshDesc'];
$mhDesc = $data['mhDesc'];
$smhDesc = $data['smhDesc'];
$mjhDesc = $data['mjhDesc'];
$scheme = $data['scheme'];
$year = $data['year'];

$query = "select id from budget_years where year=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$year]);
$yearId = $stmt->fetch(PDO::FETCH_ASSOC);
$query = "select id from hoa_status where status=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$charged]);
$statusId = $stmt->fetch(PDO::FETCH_ASSOC);
$query = "select id from hods where type=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$scheme]);
$hodId = $stmt->fetch(PDO::FETCH_ASSOC);
$query = "UPDATE hoa_details SET name_of_hod=:name_of_hod, budget_year_id=:budget_year_id, hod_id=:hod_id, hoa=:hoa, mjh_desc=:mjh_desc, smh_desc=:smh_desc, mh_desc=:mh_desc, gsh_desc=:gsh_desc, sh_desc=:sh_desc, dh_desc=:dh_desc, sdh_desc=:sdh_desc, status_id=:status_id, amount=:amount WHERE id=:id";
$stmt = $pdo->prepare($query);

$stmt->bindParam(':name_of_hod', $hod);
$stmt->bindParam(':budget_year_id', $yearId['id']);
$stmt->bindParam(':hod_id', $hodId['id']);
$stmt->bindParam(':hoa', $hoa);
$stmt->bindParam(':mjh_desc', $mjhDesc);
$stmt->bindParam(':smh_desc', $smhDesc);
$stmt->bindParam(':mh_desc', $mhDesc);
$stmt->bindParam(':gsh_desc', $gshDesc);
$stmt->bindParam(':sh_desc', $shDesc);
$stmt->bindParam(':dh_desc', $dhDesc);
$stmt->bindParam(':sdh_desc', $sdhDesc);
$stmt->bindParam(':status_id', $statusId['id']);
$stmt->bindParam(':amount', $amount);
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    $response['status'] = true;
    $response['message'] = 'HOA updated successfully';
}

echo json_encode($response);
