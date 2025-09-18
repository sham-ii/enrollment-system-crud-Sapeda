<?php
include "../db.php";

$id   = $_POST['year_id'];
$from = $_POST['year_from'];
$to   = $_POST['year_to'];

// Validation 1: year_from must be less than year_to
if ($from >= $to) {
    echo "error: Year From must be less than Year To";
    exit;
}

// Validation 2: prevent duplicate ranges (excluding itself)
$check = $conn->prepare("SELECT * FROM year_tbl WHERE year_from = ? AND year_to = ? AND year_id != ?");
$check->bind_param("iii", $from, $to, $id);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo "error: Year range already exists";
    exit;
}

// Update if valid
$sql = $conn->prepare("UPDATE year_tbl SET year_from=?, year_to=? WHERE year_id=?");
$sql->bind_param("iii", $from, $to, $id);

echo $sql->execute() ? "success" : "error: " . $conn->error;
?>
