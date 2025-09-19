<?php
require '../config.php';

$sql = "SELECT e.enroll_id, 
               s.stud_id, s.last_name, s.first_name, s.mid_init, s.program_id, s.allowance, p.program_name,
               sub.subject_id, sub.subject_name,
               sem.sem_id, sem.sem_name,
               y.year_id, y.year_from, y.year_to
        FROM enrollment_tbl e
        JOIN student_tbl s ON e.stud_id = s.stud_id
        JOIN program_tbl p ON s.program_id = p.program_id
        JOIN subject_tbl sub ON e.subject_id = sub.subject_id
        JOIN semester_tbl sem ON e.sem_id = sem.sem_id
        JOIN year_tbl y ON e.year_id = y.year_id
        ORDER BY e.enroll_id ASC";

$result = $conn->query($sql);
$enrollments = [];

while($row = $result->fetch_assoc()){
    $enrollments[] = $row;
}

echo json_encode($enrollments);
?>
