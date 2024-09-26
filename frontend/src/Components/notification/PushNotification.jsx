import React from "react";
import { Alert, AlertTitle, Box, Button } from "@mui/material";
import { CheckmarkIcon } from "react-hot-toast";
import { useNotification, NotificationProvider } from "./NotificationContext";

function PushNotificationComponent() {
    const { notifyUser, enableNotifsAndClose, disableNotifsAndClose, userResponded } = useNotification();

    return (
        !(userResponded) && !(Notification.permission === 'granted') ? (
            <Alert icon={<CheckmarkIcon fontSize="inherit" />} severity="success">
                <Box>
                    <AlertTitle>Notifications</AlertTitle>
                    Would you like to enable notifications?
                    <Button onClick={enableNotifsAndClose}>Sure</Button>
                    <Button onClick={disableNotifsAndClose}>No Thanks!</Button>
                </Box>
            </Alert>
        ) : (Notification.permission === 'granted') ? (
            <Button onClick={() => notifyUser("Thank you for watching the video!", "Notification", {
                icon: "../../public/images/logo/fav-2.png"  // Add your image URL here
            })}>
                Click to show thanks!
            </Button>
        ) : (
            <>
                <h1>You have disabled notifications</h1>
            </>
        )
    );
}

export default function PushNotification() {
    return (
        <NotificationProvider>
            <PushNotificationComponent />
        </NotificationProvider>
    );
}
