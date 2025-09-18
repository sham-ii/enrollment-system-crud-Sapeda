<?php
include "../db.php";

$from = $_POST['year_from'];
$to   = $_POST['year_to'];

// Validation 1: year_from must be less than year_to
if ($from >= $to) {
    echo "error: Year From must be less than Year To";
    exit;
}

// Validation 2: prevent duplicate ranges
$check = $conn->prepare("SELECT * FROM year_tbl WHERE year_from = ? AND year_to = ?");
$check->bind_param("ii", $from, $to);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo "error: Year range already exists";
    exit;
}

// Insert if valid
$sql = $conn->prepare("INSERT INTO year_tbl (year_from, year_to) VALUES (?, ?)");
$sql->bind_param("ii", $from, $to);

echo $sql->execute() ? "success" : "error: " . $conn->error;
?>
