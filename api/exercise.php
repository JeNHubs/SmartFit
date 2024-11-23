<?php
// Include MongoDB PHP client
require 'vendor/autoload.php'; // Include Composer's autoloader

// MongoDB connection settings
$client = new MongoDB\Client("mongodb://localhost:27017"); // MongoDB connection URL
$collection = $client->SmartFit->exercises; // Use the exerciseDb database and exercises collection

// Set the header to return JSON data
header('Content-Type: application/json');

// Fetch all exercises from MongoDB
try {
    $exercises = $collection->find(); // Query all documents in the collection

    // Convert MongoDB cursor to an array and encode as JSON
    $exercisesArray = iterator_to_array($exercises);
    
    // Encode and return the data as JSON
    echo json_encode($exercisesArray);
} catch (Exception $e) {
    // Handle errors if any
    echo json_encode(['error' => 'Error fetching exercises from MongoDB: ' . $e->getMessage()]);
}
?>
