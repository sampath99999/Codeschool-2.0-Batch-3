<?php
try {
    require './dbconfig.php';
    $pdo = getPDO();
    $query = "SELECT * FROM categories";
    $smt = $pdo->prepare($query);
    $smt->execute();
    $result = $smt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch (PDOException $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
