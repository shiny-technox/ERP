import React, { useState } from "react";
import { Alert, AlertTitle, Box, Button } from "@mui/material";
import { CheckmarkIcon } from "react-hot-toast";

async function notifyUser(
    notificationText = "Thank you for enabling notifications!",
    title = "Notification",
    options = {}
) {
    if (!("Notification" in window)) {
        alert("Browser does not support notifications");
    } else if (Notification.permission === 'granted') {
        new Notification(title, { ...options, body: notificationText });
    } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            new Notification(title, { ...options, body: notificationText });
        }
    }
}

export default function Test() {
    const [userResponded, setUserResponded] = useState(false);

    async function enableNotifsAndClose() {
        try {
            await notifyUser("Thank you for enabling notifications!", "Notifications Enabled", {
                icon: "../../public/images/logo/fav-2.png"  // Add your image URL here
            }).then(() => {
                setUserResponded(true);
            });
            
        } catch (error) {
            console.error("Error enabling notifications", error);
        }
    }

    function disableNotifsAndClose() {
        setUserResponded(true);
    }

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
