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
$title = $_POST['title'];
$price = $_POST['price'];
$description = $_POST['description'];
$category_id = $_POST['category_id'];
if (isset($_FILES['image'])) {
    $image = $_FILES['image'];

    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
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

    $uniqueFilename = uniqid() . '.' . $imageFileType;
    if (move_uploaded_file($image['tmp_name'], $uploadDir . $uniqueFilename)) {
        $query = $pdo->prepare("
            INSERT INTO products (title, price, description, category_id, image) VALUES(?,?,?,?,?)
        ");
        $query->execute([$title, $price, $description, $category_id, $uploadDir . $uniqueFilename]);

        $response['status'] = true;
        $response['message'] = "Successfully Added Product";
    } else {
        $response['message'] = 'Error uploading the image';
    }
} else {
    $response['message'] = 'Image file not found';
}

echo json_encode($response);
?>
