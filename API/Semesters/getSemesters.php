<?php
include "../db.php";

$result = $conn->query("SELECT * FROM semester_tbl");
$rows = [];
while($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);
?>
