<?php
require '../config.php';

$stud_id = $_POST['stud_id'];
$subject_id = $_POST['subject_id'];
$sem_id = $_POST['sem_id'];
$year_id = $_POST['year_id'];

$check = $conn->prepare("SELECT * FROM enrollment_tbl WHERE stud_id=? AND subject_id=? AND sem_id=? AND year_id=?");
$check->bind_param("iiii", $stud_id, $subject_id, $sem_id, $year_id);
$check->execute();
$res = $check->get_result();

if($res->num_rows > 0){
    echo "error: Enrollment already exists";
    exit;
}

$stmt = $conn->prepare("INSERT INTO enrollment_tbl (stud_id, subject_id, sem_id, year_id) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iiii", $stud_id, $subject_id, $sem_id, $year_id);

if($stmt->execute()){
    echo "success";
} else {
    echo "error: " . $conn->error;
}
?>
