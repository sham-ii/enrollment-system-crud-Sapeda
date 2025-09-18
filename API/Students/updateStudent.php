<?php
include "../db.php";

$id    = $_POST['stud_id'];
$lname = $_POST['last_name'];
$fname = $_POST['first_name'];
$mname = $_POST['mid_init'];
$prog  = $_POST['program_id'];
$allow = $_POST['allowance'];

$sql = "UPDATE student_tbl 
        SET last_name='$lname', first_name='$fname', mid_init='$mname',
            program_id='$prog', allowance='$allow'
        WHERE stud_id=$id";

echo $conn->query($sql) ? "success" : "error";
?>
