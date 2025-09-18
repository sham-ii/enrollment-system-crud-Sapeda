<?php
include "../db.php";

$sem_id = $_POST["sem_id"];

$stmt = $conn->prepare("DELETE FROM semester_tbl WHERE sem_id = ?");
$stmt->bind_param("i", $sem_id);

echo $stmt->execute() ? "success" : "error: " . $conn->error;
?>
