<?php
require './dbconfig.php';
$post = file_get_contents('php://input');
$json = json_decode($post, true);
try {
    $pdo = getPDO();
    if (isset($json['id'])) {
        $id = $json['id'];
        $query = "SELECT * FROM products where category_id=?";
        $smt = $pdo->prepare($query);
        $smt->execute([$id]);
        $result = $smt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } else { 
        var_dump($post);
    }
} catch (PDOException $e) {
    
    echo "Database Error: " . $e->getMessage();
}
?>

