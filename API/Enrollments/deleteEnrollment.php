<?php
require '../config.php';

$enroll_id = $_POST['enroll_id'];

$stmt = $conn->prepare("DELETE FROM enrollment_tbl WHERE enroll_id=?");
$stmt->bind_param("i", $enroll_id);

if($stmt->execute()){
    echo "success";
} else {
    echo "error: " . $conn->error;
}
?>
