<?php
include "../db.php";

$subject_name = $_POST["subject_name"];
$sem_id = $_POST["sem_id"];
$sem_name = $_POST["sem_name"] ?? ""; 

if (empty($sem_name)) {
    $sem_name = $sem_id."th Semester ";
}

$check = $conn->prepare("SELECT * FROM semester_tbl WHERE sem_id = ?");
$check->bind_param("i", $sem_id);
$check->execute();
$result = $check->get_result();

if ($result->num_rows == 0) {
    $insertSemester = $conn->prepare("INSERT INTO semester_tbl (sem_id, sem_name) VALUES (?, ?)");
    $insertSemester->bind_param("is", $sem_id, $sem_name);
    $insertSemester->execute();
}

$stmt = $conn->prepare("INSERT INTO subject_tbl (subject_name, sem_id) VALUES (?, ?)");
$stmt->bind_param("si", $subject_name, $sem_id);

if ($stmt->execute()) {
    echo "success";
} else {
    echo "error: " . $conn->error;
}
?>
