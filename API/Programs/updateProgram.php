<?php
include "../db.php";

$id   = $_POST['program_id'];
$name = $_POST['program_name'];
$ins  = $_POST['ins_id'];

$sql = "UPDATE program_tbl SET program_name='$name', ins_id='$ins' WHERE program_id=$id";

echo $conn->query($sql) ? "success" : "error: " . $conn->error;
?>
