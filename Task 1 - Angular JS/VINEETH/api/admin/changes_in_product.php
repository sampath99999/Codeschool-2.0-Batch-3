<?php

require_once '../dbconfig.php';
$pdo = getPDO();
$post = file_get_contents('php://input');
$json = json_decode($post, true);
$response = ['status' => false, 'message' => ''];

$query = 'SELECT cat_id FROM categories WHERE name = ?';
$smt = $pdo->prepare($query);
$smt->execute([$json['name']]);
$category_id = $smt->fetchColumn();

if ($category_id !== false) {
    $sql = 'UPDATE products 
            SET productname = ?, price = ?, category_id = ?, rating = ?
            WHERE id = ?';
    $smt = $pdo->prepare($sql);
    $smt->bindParam(1, $json['productname']);
    $smt->bindParam(2, $json['price']);
    $smt->bindParam(3, $category_id);
    $smt->bindParam(4, $json['rating']);
    $smt->bindParam(5, $json['id']);
    
    if ($smt->execute()) {
        $response['status'] = true;
        $response['message'] = 'Product updated successfully';
    } else {
        $response['message'] = 'Error updating product';
    }
} else {
    $response['message'] = 'Category not found';
}

echo json_encode($response);
?>
