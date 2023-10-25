<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
require_once("admin.php");
$jsonData = file_get_contents('php://input');
$postData = json_decode($jsonData, true);
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
    $response['message']= 'Unauthorized Access';
    exit;
}
$response['admin'] = true;
$id = $_POST["id"];
$title = $_POST["title"];
$price = $_POST["price"];
$description = $_POST["description"];
$category_id = $_POST["category_id"];
$base_directory = '../uploads/';
if (isset($_FILES['image'])) {
    $image = $_FILES['image'];

    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif','JPG','JPEG','PNG','GIF'];
    $imageFileType = strtolower(pathinfo($image['name'], PATHINFO_EXTENSION));

    if (!in_array($imageFileType, $allowedExtensions)) {
        $response['message'] = 'Invalid image file format';
        echo json_encode($response);
        exit;
    }

    $uploadDir = '../uploads/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    chmod($uploadDir, 0755);
    $query = $pdo->prepare('
        SELECT  image FROM products WHERE id = ?
    ');

    $query->execute([$id]);
    $data = $query->fetch(PDO::FETCH_ASSOC);
    unlink($base_directory.$data['image']);

    $uniqueFilename = uniqid() . '.' . $imageFileType;
    if (move_uploaded_file($image['tmp_name'], $uploadDir . $uniqueFilename)) {
    $query = $pdo->prepare("
        UPDATE  products SET title = ?, price = ?, description = ?, category_id = ?, image = ? WHERE id = ?
    ");

    $query->execute([$title, $price, $description, $category_id, $uploadDir . $uniqueFilename, $id]);
    $response['data'] = $uploadDir . $uniqueFilename;
    $response['status'] = true;
    $response['message'] = "Successfully Updated Product Details";
    } else {
        $response['message'] = 'Error uploading the image';
    }
} else {
    $query = $pdo->prepare("
        UPDATE  products SET title = ?, price = ?, description = ?, category_id = ? WHERE id = ?
    ");

    $query->execute([$title, $price, $description, $category_id, $id]);
    $response['data'] = '';
    $response['status'] = true;
    $response['message'] = "Successfully Updated Product Details";

}

echo json_encode($response);
?>
