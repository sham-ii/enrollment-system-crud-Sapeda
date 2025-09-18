<?php
include "../db.php";

$id = $_POST['program_id'];

$sql = "DELETE FROM program_tbl WHERE program_id=$id";

echo $conn->query($sql) ? "success" : "error: " . $conn->error;
?>
