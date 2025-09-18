<?php
include "../db.php";

$sem_id = $_POST["sem_id"];
$sem_name = $_POST["sem_name"];
$year_id = $_POST["year_id"];

$stmt = $conn->prepare("UPDATE semester_tbl SET sem_name = ?, year_id = ? WHERE sem_id = ?");
$stmt->bind_param("sii", $sem_name, $year_id, $sem_id);

echo $stmt->execute() ? "success" : "error: " . $conn->error;
?>
