<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'errors.log');

require_once "dbConfig.php";

require_once "tokenValidation.php";


$response = ['status' => false, 'message' => '', 'data' => []];

$input = json_decode(file_get_contents('PHP://input'), true);



if (empty($input['hod'])) {
  $response['message'] = 'Hod is required';
  echo json_encode($response);
  exit;
}

if (empty($input['budgetYear'])) {
  $response['message'] = 'Budget year is required';
  echo json_encode($response);
  exit;
}

if (empty($input['estSch'])) {
  $response['message'] = 'Est_sch is required';
  echo json_encode($response);
  exit;
}

if (empty($input['majorHead'])) {
  $response['message'] = 'Major head is required';
  echo json_encode($response);
  exit;
}

if (empty($input['majorHeadDesc'])) {
  $response['message'] = 'Major head description is required';
  echo json_encode($response);
  exit;
}

if (empty($input['subMajorHead'])) {
  $response['message'] = 'Sub major head is required';
  echo json_encode($response);
  exit;
}

if (empty($input['subMajorHeadDesc'])) {
  $response['message'] = 'Sub major head description is required';
  echo json_encode($response);
  exit;
}

if (empty($input['minorHead'])) {
  $response['message'] = 'Minor  head is required';
  echo json_encode($response);
  exit;
}

if (empty($input['minorHeadDesc'])) {
  $response['message'] = 'Minor  head description is required';
  echo json_encode($response);
  exit;
}

if (empty($input['groupSubHead'])) {
  $response['message'] = 'Group sub head is required';
  echo json_encode($response);
  exit;
}

if (empty($input['groupSubHeadDesc'])) {
  $response['message'] = 'Group sub head description is required';
  echo json_encode($response);
  exit;
}

if (empty($input['subHead'])) {
  $response['message'] = 'Sub head is required';
  echo json_encode($response);
  exit;
}

if (empty($input['subHeadDesc'])) {
  $response['message'] = 'Sub head description is required';
  echo json_encode($response);
  exit;
}

if (empty($input['detailedHead'])) {
  $response['message'] = 'Detailed head is required';
  echo json_encode($response);
  exit;
}

if (empty($input['detailedHeadDesc'])) {
  $response['message'] = 'Detailed head description is required';
  echo json_encode($response);
  exit;
}

if (empty($input['subDetailedHead'])) {
  $response['message'] = 'Sub detailed head is required';
  echo json_encode($response);
  exit;
}

if (empty($input['subDetailedHeadDesc'])) {
  $response['message'] = 'Sub detailed head description is required';
  echo json_encode($response);
  exit;
}

if (empty($input['charVot'])) {
  $response['message'] = 'Char_vot  is required';
  echo json_encode($response);
  exit;
}

if (empty($input['estAmount'])) {
  $response['message'] = 'Estimated amount  is required';
  echo json_encode($response);
  exit;
}

$hoa = $input["majorHead"] . $input["subMajorHead"] . $input["minorHead"] . $input["groupSubHead"] . $input["subHead"] . $input["detailedHead"] . $input["subDetailedHead"] . 'PVN';
$query = "SELECT id FROM head_of_accounts WHERE hoa=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$hoa]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result && $result['id']) {
  $response['message'] = "Already exists";
  echo json_encode($response);
  exit;
}


$hod = $input["hod"];
$budgetYear = $input["budgetYear"];
$estSch = $input["estSch"];
$majorHead = $input["majorHead"];
$majorHeadDesc = $input["majorHeadDesc"];
$subMajorHead = $input["subMajorHead"];
$subMajorHeadDesc = $input["subMajorHeadDesc"];
$minorHead = $input["minorHead"];
$minorHeadDesc = $input["minorHeadDesc"];
$groupSubHead = $input["groupSubHead"];
$groupSubHeadDesc = $input["groupSubHeadDesc"];
$subHead = $input["subHead"];
$subHeadDesc = $input["subHeadDesc"];
$detailedHead = $input["detailedHead"];
$detailedHeadDesc = $input["detailedHeadDesc"];
$subDetailedHead = $input["subDetailedHead"];
$subDetailedHeadDesc = $input["subDetailedHeadDesc"];
$charVot = $input["charVot"];
$estAmount = $input['estAmount'];

$query = "INSERT INTO head_of_accounts( dep_hod, e_s, mjh,mjh_desc, smjh,smjh_desc, mih,mih_desc, gsh,gsh_desc, sh,sh_desc, dh,dh_desc, sdh,sdh_desc,c_v,budget_year,est_amount) VALUES( :hod, :estSch, :majorHead,:majorHeadDesc, :subMajorHead,:subMajorHeadDesc, :minorHead,:minorHeadDesc, :groupSubHead,:groupSubHeadDesc, :subHead,:subHeadDesc, :detailedHead,:detailedHeadDesc, :subDetailedHead,:subDetailedHeadDesc, :charVot,:budgetYear,:estAmount)";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':hod', $hod);
$stmt->bindParam(':estSch', $estSch);
$stmt->bindParam(':majorHead', $majorHead);
$stmt->bindParam(':majorHeadDesc', $majorHeadDesc);
$stmt->bindParam(':subMajorHead', $subMajorHead);
$stmt->bindParam(':subMajorHeadDesc', $subMajorHeadDesc);
$stmt->bindParam(':minorHead', $minorHead);
$stmt->bindParam(':minorHeadDesc', $minorHeadDesc);
$stmt->bindParam(':groupSubHead', $groupSubHead);
$stmt->bindParam(':groupSubHeadDesc', $groupSubHeadDesc);
$stmt->bindParam(':subHead', $subHead);
$stmt->bindParam(':subHeadDesc', $subHeadDesc);
$stmt->bindParam(':detailedHead', $detailedHead);
$stmt->bindParam(':detailedHeadDesc', $detailedHeadDesc);
$stmt->bindParam(':subDetailedHead', $subDetailedHead);
$stmt->bindParam(':subDetailedHeadDesc', $subDetailedHeadDesc);
$stmt->bindParam(':charVot', $charVot);
$stmt->bindParam(':budgetYear', $budgetYear);
$stmt->bindParam(':estAmount', $estAmount);
$stmt->execute();
$response['status'] = true;
$response["message"] = 'successful';
header('HTTP/1.1 201 created');
echo json_encode($response);
