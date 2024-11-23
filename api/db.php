<?php
// db.php - Database connection using MongoDB

require 'vendor/autoload.php'; // Include Composer's autoloader

// MongoDB connection URL
$mongoUri = "mongodb://localhost:27017"; // Update this with your MongoDB connection string
$client = new MongoDB\Client($mongoUri);

// Database and collection
$database = $client->SmartFit; // Name of your database
$usersCollection = $database->users; // Name of the collection for users

?>
