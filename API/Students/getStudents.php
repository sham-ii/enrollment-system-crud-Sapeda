<?php
include "../db.php";

$result = $conn->query("
    SELECT s.stud_id, s.last_name, s.first_name, s.mid_init,
           s.program_id, p.program_name, s.allowance
    FROM student_tbl s
    LEFT JOIN program_tbl p ON s.program_id = p.program_id
");

$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}
echo json_encode($students);
?>
