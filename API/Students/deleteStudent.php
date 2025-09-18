<?php
include "../db.php";

$id = $_POST['stud_id'];
$sql = "DELETE FROM student_tbl WHERE stud_id=$id";

echo $conn->query($sql) ? "success" : "error";
?>
