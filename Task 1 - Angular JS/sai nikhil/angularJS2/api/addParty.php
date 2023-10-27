<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

$data = json_decode(file_get_contents("php://input"));

if (!$data->partyType) {
    $response['status'] == false;
    $response['message'] = 'Party Type Cannot be Empty';
    echo json_encode($response);
    exit;
}

if (!$data->partyName) {
    $response['status'] = false;
    $response['message'] = 'Party Name Cannot be Empty';
    echo json_encode($response);
    exit;
}

$query = "SELECT * FROM PARTIES WHERE party_name=? AND party_type=?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$data->partyName, $data->partyType]);
$result = $stmt->fetch();
if ($result) {
    $response['status'] = false;
    $response['message'] = "Party Already Exists";
    echo json_encode($response);
    exit;
}

$query = "INSERT INTO PARTIES(party_type,party_name) VALUES(?,?);";

$stmt = $pdo->prepare($query);
$result = $stmt->execute([$data->partyType, $data->partyName]);

if (!$result) {
    $response['status'] = false;
    $response['message'] = "Kindly Check Party Name and Party Type";
    echo json_encode($response);
    exit;
}

$response['status'] = true;
$response['message'] = "Party Added Successfully";
echo json_encode($response);
