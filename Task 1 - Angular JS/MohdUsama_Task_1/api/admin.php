
<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
function is_admin($pdo, $token) {
    $query = "select role from users where token = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$token]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result["role"] == 1;
}

?>
