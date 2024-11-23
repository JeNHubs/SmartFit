<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'vendor/autoload.php';
$client = new MongoDB\Client("mongodb://localhost:27017");
$database = $client->SmartFit;
$usersCollection = $database->users;

$data = json_decode(file_get_contents("php://input"));

// Debugging: Check incoming data
error_log("Received Data: " . json_encode($data));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(['error' => 'Email and Password are required']);
    exit();
}

$email = $data->email;
$password = $data->password;

// Debugging: Log email and password
error_log("Received email: " . $email);
error_log("Received password: " . $password);

$user = $usersCollection->findOne(['email' => $email]);

// Debugging: Log if user is found
if (!$user) {
    echo json_encode(['error' => 'User not found']);
    exit();
}

error_log("User found: " . json_encode($user));

// Verify password
if (password_verify($password, $user['password'])) {
    echo json_encode(['success' => 'Login successful']);
} else {
    echo json_encode(['error' => 'Incorrect password']);
}
?>
