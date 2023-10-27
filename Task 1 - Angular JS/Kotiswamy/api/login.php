<?PHP
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set("error_log", "errors.log");
require_once "dbConfig.php";

$response = ['status' => false, 'message' => '', 'token' => ''];

$input = json_decode(file_get_contents('PHP://input'), true);

if (empty($input['email'])) {
  $response['message'] = 'Email is required';
  echo json_encode($response);
  exit;
}

if (empty($input['password'])) {
  $response['message'] = 'Password is required';
  echo json_encode($response);
  exit;
}


$email = $input['email'];
$password = md5($input['password']);
$token = generateRandomString(15);
$query = "SELECT id FROM users WHERE email=:email AND password=:password ";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $password);
$stmt->execute();
$result = $stmt->fetch();
if ($result && $result['id']) {
  $userId = $result['id'];
  $updateUserQuery = "INSERT INTO tokens (user_id,token) VALUES(:userId,:token)";
  $updateStmt = $pdo->prepare($updateUserQuery);
  $updateStmt->bindParam(':token', $token);
  $updateStmt->bindParam(':userId', $userId);
  $updateStmt->execute();
  $response["status"] = true;
  $response["message"] = 'successful';
  $response["token"] = $token;
  header('HTTP/1.1 201 Updated');
  echo json_encode($response);
} else {
  $response['message'] = 'Email or Password is Invalid';
  echo json_encode($response);
}


function generateRandomString($length)
{
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charLen = strlen($characters);
  $randomStr = '';
  for ($i = 0; $i < $length; $i++) {
    $randomStr .= $characters[random_int(0, $charLen - 1)];
  }
  return $randomStr;
}
