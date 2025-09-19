<?php
include "../db.php";

$result = $conn->query("
SELECT  sub.subject_id, sub.subject_name, sem.sem_id
FROM subject_tbl sub
LEFT JOIN semester_tbl sem ON sub.sem_id = sem.sem_id");
$rows = [];
while($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);
?>
