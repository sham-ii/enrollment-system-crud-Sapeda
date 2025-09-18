<?php
include "../db.php";

$id   = $_POST['subject_id'];
$name = $_POST['subject_name'];
$sem  = $_POST['sem_id'];

$sql = "UPDATE subject_tbl SET subject_name='$name', sem_id='$sem' WHERE subject_id=$id";

echo $conn->query($sql) ? "success" : "error: " . $conn->error;
?>
