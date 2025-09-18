<?php
include "../db.php";

$id = $_POST['year_id'];

$sql = "DELETE FROM year_tbl WHERE year_id=$id";
echo $conn->query($sql) ? "success" : "error: " . $conn->error;
?>
