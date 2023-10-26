<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
require_once("admin.php");

$token = null;
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $authHeaderParts = explode(' ', $authHeader);
    if (count($authHeaderParts) === 2 && $authHeaderParts[0] === 'Bearer') {
        $token = $authHeaderParts[1];
    } else {
        header('HTTP/1.0 400 Bad Request');
        echo 'Invalid Authorization header format';
        exit;
    }
} else {
    header('HTTP/1.0 401 Unauthorized');
    echo 'Authorization header is missing';
    exit;
}
$response = ["status" => false, "message" => "","data"=>""];
if(!is_admin($pdo, $token)) {
    $response['admin'] = false;
    exit;
}
$response['admin'] = true;

$query = $pdo->prepare("
    SELECT
        o.order_id,
        o.order_date,
        od.order_status,
        o.customer_id,
        p.title AS product_name,
        od.quantity,
        od.unit_price,
        od.order_detail_id
    FROM
        orders o
    JOIN
        orderdetails od ON o.order_id = od.order_id
    JOIN
        products p ON od.product_id = p.id
");

$query->execute();

$results = $query->fetchAll(PDO::FETCH_ASSOC);

$temp = array();
foreach ($results as $row) {
    $order = array(
        "order_date"=> $row["order_date"],
        "order_status"=> $row["order_status"],
        "customer_id"=> $row["customer_id"],
        "order_id" => $row['order_id'],
        "product_name" => $row['product_name'],
        "quantity" => $row['quantity'],
        "unit_price" => number_format($row['unit_price'], 2),
        "id" => $row["order_detail_id"]
    );

    $temp[] = $order;
}
$response['data'] = $temp;
$response['status'] = true;
$response['message'] = "Successfully Fetched Orders";
echo json_encode($response);
?>
