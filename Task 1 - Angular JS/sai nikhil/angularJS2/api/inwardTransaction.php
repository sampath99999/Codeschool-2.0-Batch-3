<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once('./dbConfig.php');

$response = ["status" => false, "message" => ""];

$data = json_decode(file_get_contents("php://input"));

if (!$data->party) {
    $response["status"] = false;
    $response["message"] = "Party name is required!";
    echo json_encode($response);
    exit;
}

if (!$data->products) {
    $response["status"] = false;
    $response["message"] = "Products are required!";
    echo json_encode($response);
    exit;
}
$party = $data->party;
$productsArray = $data->products;

$totalPrice = 0;
$totalProductsCount = 0;

foreach ($productsArray as $product) {
    $product_id = $product->product_id;
    $quantity = $product->quantity;


    $stmt = $pdo->prepare("SELECT product_price FROM Products WHERE id = :product_id");
    $stmt->bindParam(':product_id', $product_id);
    $stmt->execute();
    $productPrice = $stmt->fetchColumn();
    $totalPrice += $productPrice * $quantity;

    $stmt = $pdo->prepare("INSERT INTO Inventory (product_id, stock)
          VALUES (:product_id, :quantity)
          ON CONFLICT (product_id)
          DO UPDATE SET stock = Inventory.stock + :quantity");
    $stmt->bindParam(':product_id', $product_id);
    $stmt->bindParam(':quantity', $quantity);
    $stmt->execute();


    $stmt = $pdo->prepare("INSERT INTO Transactions ( transaction_type,party_id) 
          VALUES ( 'seller',:party_id) RETURNING id");

    $stmt->bindParam(':party_id', $party);

    $stmt->execute();

    $transactionId = $stmt->fetchColumn();



    $stmt = $pdo->prepare("INSERT INTO Transaction_products (transaction_id,product_id, quantity, price) 
            VALUES (:transaction_id,:product_id, :quantity, :productPrice)");
    $stmt->bindParam(':transaction_id', $transactionId);
    $stmt->bindParam(':product_id', $product_id);
    $stmt->bindParam(':quantity', $quantity);
    $stmt->bindParam(':productPrice', $totalPrice);
    $stmt->execute();
}
$response['status'] = true;
$response['message'] = "Transaction successfully processed.";
echo json_encode($response);
