<?php
$response = ['status' => 'false', 'message' => ''];
try {
    require_once './dbconfig.php';
    $pdo = getPDO();
    $sql = 'SELECT * FROM products';
    $smt = $pdo->prepare($sql);
    $smt->execute();
    $result = $smt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch (PDOException $e) {
    echo json_encode(['status' => 'false', 'message' => $e->getMessage()]);
}
