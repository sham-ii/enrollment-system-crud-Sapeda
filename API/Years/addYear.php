<?php
include "../db.php";

$from = $_POST['year_from'];
$to   = $_POST['year_to'];

if ($from >= $to) {
    echo "error: Year From must be less than Year To";
    exit;
}

$check = $conn->prepare("SELECT * FROM year_tbl WHERE year_from = ? AND year_to = ?");
$check->bind_param("ii", $from, $to);
$check->execute();
$result = $check->get_result();

if ($result->num_rows > 0) {
    echo "error: Year range already exists";
    exit;
}

$sql = $conn->prepare("INSERT INTO year_tbl (year_from, year_to) VALUES (?, ?)");
$sql->bind_param("ii", $from, $to);

echo $sql->execute() ? "success" : "error: " . $conn->error;
?>
