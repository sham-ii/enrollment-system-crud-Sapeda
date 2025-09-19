<?php
require '../config.php';

$enroll_id = $_POST['enroll_id'];
$stud_id = $_POST['stud_id'];
$subject_id = $_POST['subject_id'];
$sem_id = $_POST['sem_id'];
$year_id = $_POST['year_id'];

$stmt = $conn->prepare("UPDATE enrollment_tbl SET stud_id=?, subject_id=?, sem_id=?, year_id=? WHERE enroll_id=?");
$stmt->bind_param("iiiii", $stud_id, $subject_id, $sem_id, $year_id, $enroll_id);

if($stmt->execute()){
    echo "success";
} else {
    echo "error: " . $conn->error;
}
?>
