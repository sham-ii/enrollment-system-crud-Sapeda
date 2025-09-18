<?php
include "../db.php";

$id = $_POST['subject_id'];

$sql = "DELETE FROM subject_tbl WHERE subject_id=$id";

echo $conn->query($sql) ? "success" : "error: " . $conn->error;
?>
