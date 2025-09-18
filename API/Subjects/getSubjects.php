<?php
include "../db.php";

$result = $conn->query("SELECT * FROM subject_tbl");
$rows = [];
while($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);
?>
