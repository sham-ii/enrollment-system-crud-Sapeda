<?php
include "../db.php";

$lname = $_POST['last_name'];
$fname = $_POST['first_name'];
$mname = $_POST['mid_init'];
$prog  = $_POST['program_id'];
$allow = $_POST['allowance'];

$sql = "INSERT INTO student_tbl (last_name, first_name, mid_init, program_id, allowance) 
        VALUES ('$lname', '$fname', '$mname', '$prog', '$allow')";

echo $conn->query($sql) ? "success" : "error: " . $conn->error;
?>
