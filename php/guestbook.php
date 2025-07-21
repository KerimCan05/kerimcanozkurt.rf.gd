<?php
header('Content-Type: application/json; charset=UTF-8');

require_once __DIR__ . '/../js/config.php';

try {
    $con = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

    if ($con->connect_error) {
        throw new Exception("Connection failed: " . $con->connect_error);
    }
    if (!$con->set_charset("utf8mb4")) {
        throw new Exception("Error setting UTF-8 charset: " . $con->error);
    }

    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $mail = filter_input(INPUT_POST, 'mail', FILTER_SANITIZE_EMAIL);
    $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_NUMBER_INT);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

    if (empty($name) || empty($mail) || empty($date) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }

    $mysqlTimestamp = date('Y-m-d H:i:s', $date);

    $stmt = $con->prepare("INSERT INTO guestbook (name, mail, date, message) VALUES (?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $con->error);
    }
    $stmt->bind_param("ssss", $name, $mail, $mysqlTimestamp, $message); // ssss: all strings

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Entries added!']);
    } else {
        throw new Exception("Query failed: " . $stmt->error);
    }

    $stmt->close();
    $con->close();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>