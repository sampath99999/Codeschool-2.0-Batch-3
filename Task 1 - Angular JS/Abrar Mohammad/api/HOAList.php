<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once("dbConfig.php");

$response = ['status' => false, 'message' => "", "data" => []];

try {
    $getHoaList = "SELECT * FROM hoa_list";
    $statement = $pdo->prepare($getHoaList);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    $response['status'] = true;
    $response['message'] = "Data fetched successfully.";
    $response['data'] = $result;
    echo json_encode($response);
    exit;

} catch (Exception) {
    $response['message'] = "Something went wrong..Try Again...";
    echo json_encode($response);
    exit;
}

?>