<?php
// Handle CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require 'vendor/autoload.php';  // MongoDB PHP Library
error_reporting(E_ALL);
ini_set('display_errors', 1);


// Connect to MongoDB
$client = new MongoDB\Client("mongodb://localhost:27017");
$database = $client->SmartFit;  // Replace with your actual DB name
$usersCollection = $database->Users;

// Read JSON body
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->username) || !isset($data->email) || !isset($data->password)) {
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

// Get the form data
$username = $data->username;
$email = $data->email;
$password = $data->password;

// Check if email already exists
$existingUser = $usersCollection->findOne(['email' => $email]);
if ($existingUser) {
    echo json_encode(['error' => 'Email already taken']);
    exit();
}

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

try {
    // Insert new user into MongoDB
    $result = $usersCollection->insertOne([
        'email' => $email,
        'password' => $hashedPassword,
        'username' => $username
    ]);
    
    echo json_encode(['success' => 'User registered successfully']);
} catch (Exception $e) {
    echo json_encode(['error' => 'Signup failed: ' . $e->getMessage()]);
}
?>
