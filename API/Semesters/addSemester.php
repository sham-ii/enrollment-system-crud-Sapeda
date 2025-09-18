<?php
include "../db.php";

$year_id  = $_POST["year_id"];
$sem_name = $_POST["sem_name"] ?? "";
$year_from = $_POST["year_from"] ?? null;
$year_to   = $_POST["year_to"] ?? null;

// Check if year_id exists
$checkYear = $conn->prepare("SELECT * FROM year_tbl WHERE year_id = ?");
$checkYear->bind_param("i", $year_id);
$checkYear->execute();
$result = $checkYear->get_result();

// If year does not exist, create it automatically
if ($result->num_rows == 0) {
    // If no year_from and year_to are provided, generate dummy values
    if (!$year_from || !$year_to) {
        $year_from = date("Y");          // current year
        $year_to   = $year_from + 1;     // next year
    }

    $insertYear = $conn->prepare("INSERT INTO year_tbl (year_id, year_from, year_to) VALUES (?, ?, ?)");
    $insertYear->bind_param("iii", $year_id, $year_from, $year_to);

    if (!$insertYear->execute()) {
        echo "error: " . $conn->error;
        exit;
    }
}

// Auto-generate sem_name if empty
if (empty($sem_name)) {
    $check = $conn->prepare("SELECT COUNT(*) as count FROM semester_tbl WHERE year_id = ?");
    $check->bind_param("i", $year_id);
    $check->execute();
    $countResult = $check->get_result()->fetch_assoc();
    $nextNum = $countResult["count"] + 1;
    $sem_name = "Semester " . $nextNum;
}

// Insert semester
$stmt = $conn->prepare("INSERT INTO semester_tbl (sem_name, year_id) VALUES (?, ?)");
$stmt->bind_param("si", $sem_name, $year_id);

echo $stmt->execute() ? "success" : "error: " . $conn->error;
?>
