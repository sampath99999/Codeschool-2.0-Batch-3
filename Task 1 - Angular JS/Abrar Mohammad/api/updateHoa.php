<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once("dbConfig.php");
$input = json_decode(file_get_contents('php://input'), true);

$response = ['status' => false, 'message' => ""];

if (!isset($input['hoaNumber'])) {
    $response['message'] = 'hoa_number is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['headOfDept'])) {
    $response['message'] = 'head_of_dept is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['budgetYear'])) {
    $response['message'] = 'budget_year is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['estbScheme'])) {
    $response['message'] = 'estb_scheme is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['majorHeadNum'])) {
    $response['message'] = 'major_head_num is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['majorHead'])) {
    $response['message'] = 'major_head is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['subMajorHeadNum'])) {
    $response['message'] = 'sub_major_head_num is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['subMajorHead'])) {
    $response['message'] = 'sub_major_head is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['minorHeadNum'])) {
    $response['message'] = 'minor_head_num is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['minorHead'])) {
    $response['message'] = 'minor_head is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['groupSubHeadNum'])) {
    $response['message'] = 'group_sub_head_num is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['groupSubHead'])) {
    $response['message'] = 'group_sub_head is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['subHeadNum'])) {
    $response['message'] = 'sub_head_num is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['subHead'])) {
    $response['message'] = 'sub_head is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['detailedHeadNum'])) {
    $response['message'] = 'detailed_head_num is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['detailedHead'])) {
    $response['message'] = 'detailed_head is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['subDetailedHeadNum'])) {
    $response['message'] = 'sub_detailed_head_num is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['subDetailedHead'])) {
    $response['message'] = 'sub_detailed_head is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['charged'])) {
    $response['message'] = 'charged_voted is required';
    echo json_encode($response);
    exit;
}
if (!isset($input['hoaId'])) {
    $response['message'] = 'hoaId is required';
    echo json_encode($response);
    exit;
}

try {
    $hoaNumber = $input['hoaNumber'];
    $headOfDept = $input['headOfDept'];
    $budgetYear = $input['budgetYear'];
    $estbScheme = $input['estbScheme'];
    $majorHeadNum = $input['majorHeadNum'];
    $majorHead = $input['majorHead'];
    $subMajorHeadNum = $input['subMajorHeadNum'];
    $subMajorHead = $input['subMajorHead'];
    $minorHeadNum = $input['minorHeadNum'];
    $minorHead = $input['minorHead'];
    $groupSubHeadNum = $input['groupSubHeadNum'];
    $groupSubHead = $input['groupSubHead'];
    $subHeadNum = $input['subHeadNum'];
    $subHead = $input['subHead'];
    $detailedHeadNum = $input['detailedHeadNum'];
    $detailedHead = $input['detailedHead'];
    $subDetailedHeadNum = $input['subDetailedHeadNum'];
    $subDetailedHead = $input['subDetailedHead'];
    $charVoted = $input['charged'];
    $hoaId = $input['hoaId'];
    $addHoa = 'UPDATE hoa_list SET hoa_number = ?,head_of_dept = ?,budget_year = ?,estb_scheme = ?,major_head_num = ?,major_head = ?,sub_major_head_num = ?,sub_major_head = ?,minor_head_num = ?,minor_head = ?,group_sub_head_num = ?,group_sub_head = ?,sub_head_num = ?,sub_head = ?,detailed_head_num = ?,detailed_head = ?,sub_detailed_head_num = ?,sub_detailed_head = ?,charged_voted = ? WHERE id = ?';
    $stmt = $pdo->prepare($addHoa);
    $stmt->execute([$hoaNumber, $headOfDept, $budgetYear, $estbScheme, $majorHeadNum, $majorHead, $subMajorHeadNum, $subMajorHead, $minorHeadNum, $minorHead, $groupSubHeadNum, $groupSubHead, $subHeadNum, $subHead, $detailedHeadNum, $detailedHead, $subDetailedHeadNum, $subDetailedHead, $charVoted, $hoaId]);
    $response['status'] = true;
    $response['message'] = 'HOA List Updated Successfully.';
    echo json_encode($response);
    exit;

} catch (Exception) {
    $response['message'] = 'Something went wrong!!..Data insertion failed..';
    echo json_encode($response);
    exit;
}

?>