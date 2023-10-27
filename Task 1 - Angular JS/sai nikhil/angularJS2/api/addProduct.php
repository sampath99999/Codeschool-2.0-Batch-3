<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response =  ["status" => false, "message" => ""];

$data = json_decode(file_get_contents("php://input"));

if (!$data->productName) {
    $response['status'] = false;
    $response['message'] = 'Product Name Cannot be Empty';
    echo json_encode($response);
    exit;
}

if (!$data->productPrice) {
    $response['status'] = false;
    $response['message'] = 'Product Price Cannot be Empty';
    echo json_encode($response);
    exit;
}

if (!$data->productCategory) {
    $response['status'] = false;
    $response['message'] = 'Product Category Cannot be Empty';
    echo json_encode($response);
    exit;
}

$query = "SELECT * FROM PRODUCTS WHERE product_name=?;";
$stmt = $pdo->prepare($query);
$stmt->execute([$data->productName]);
$result = $stmt->fetch();
if ($result) {
    $response['status'] = false;
    $response['message'] = 'Product Already Exists';
    echo json_encode($response);
    exit;
}


$query = "INSERT INTO PRODUCTS(product_name,product_price,product_category) VALUES(?,?,?);";

$stmt = $pdo->prepare($query);
$result = $stmt->execute([$data->productName, $data->productPrice, $data->productCategory]);

if (!$result) {
    $response['status'] = false;
    $response['message'] = 'Kindly Check the Input Fields';
    echo json_encode($response);
    exit;
}
$response['status'] = true;
$response['message'] = 'Product Added SuccessFully';
echo json_encode($response);
exit;
