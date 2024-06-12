<?php
session_start();
require 'send_email.php'; // Assume this contains your email-sending function. E.g., PHPMailer

if (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validate username and password against your database
    // Let's assume the validation is successful and you proceed with OTP generation

    $_SESSION['otp'] = rand(100000, 999999);  // Generate a random OTP
    $_SESSION['email'] = 'admin@example.com'; // Should be fetched from the database based on username
    $_SESSION['username'] = $username;

    // Send OTP to the registered email address
    $subject = "Your OTP Code";
    $body = "Your OTP code is " . $_SESSION['otp'];
    $recipientEmail = $_SESSION['email'];

    if (sendEmail($recipientEmail, $subject, $body)) {
        header("Location: verify_otp.php");
    } else {
        echo "Failed to send OTP. Please try again.";
    }
}
?>