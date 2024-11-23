<?php 

header("Access-Control-Allow-Origin: *"); // Allow all origins (replace * with specific URL in production)
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

require 'vendor/autoload.php'; // Include Composer's autoloader
use MongoDB\Client;

$uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
$client = new Client($uri);
$database = $client->SmartFit;
$usersCollection = $database->workouts; // Use workouts collection here
header('Content-Type: application/json');

// Handle POST request (for creating a workout)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (isset($data['workoutName']) && isset($data['exercises'])) {
        $workoutName = $data['workoutName'];
        $exercises = $data['exercises'];

        // Insert workout into the MongoDB collection
        $result = $usersCollection->insertOne([
            'workoutName' => $workoutName,
            'exercises' => $exercises
        ]);

        // Return the created workout as a response
        echo json_encode([
            'success' => true,
            'message' => 'Workout created successfully',
            'workout' => [
                'id' => $result->getInsertedId(),
                'workoutName' => $workoutName,
                'exercises' => $exercises
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
}


// Handle GET request (for retrieving all workouts)
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all workouts from the collection
    $workouts = $usersCollection->find()->toArray(); // Use $usersCollection here

    // Return the workouts as a response
    echo json_encode([
        'success' => true,
        'workouts' => $workouts
    ]);
}

?>
