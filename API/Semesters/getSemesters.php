<?php
include "../db.php";

$result = $conn->query("
    SELECT sem.sem_id, sem.sem_name, y.year_id
    FROM semester_tbl sem
    LEFT JOIN year_tbl y ON sem.year_id = y.year_id");
$rows = [];
while($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);
?>
