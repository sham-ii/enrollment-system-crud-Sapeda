<?php
include "../db.php";

$program_name = $_POST["program_name"];
$ins_id = $_POST["ins_id"];
$ins_name = $_POST["ins_name"] ?? ""; 

if (empty($ins_name)) {
    $ins_name = "College of Institute " . $ins_id;
}

$check = $conn->prepare("SELECT * FROM institute_tbl WHERE ins_id = ?");
$check->bind_param("i", $ins_id);
$check->execute();
$result = $check->get_result();

if ($result->num_rows == 0) {
    $insertInstitute = $conn->prepare("INSERT INTO institute_tbl (ins_id, ins_name) VALUES (?, ?)");
    $insertInstitute->bind_param("is", $ins_id, $ins_name);
    $insertInstitute->execute();
}

$stmt = $conn->prepare("INSERT INTO program_tbl (program_name, ins_id) VALUES (?, ?)");
$stmt->bind_param("si", $program_name, $ins_id);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error: " . $conn->error;
}
?>
