Key Changes:

    OTP Notification: Added a new notification type for receiving OTP from Pusher.

    Input Box: Added an input box where the user can enter the OTP.

    Send OTP: Added a button to send the OTP to another channel and close the notification.

    Removed Ngrok: Removed all ngrok-related code.

Explanation:

    Pusher OTP Event: The code listens for an otp-event from Pusher and displays a notification with the received OTP.

    Input Box: The user can enter the OTP in the input box and send it by clicking the "Send OTP" button.

    Close Notification: The notification can be closed either by clicking the "Close" button in the notification or by sending the OTP.