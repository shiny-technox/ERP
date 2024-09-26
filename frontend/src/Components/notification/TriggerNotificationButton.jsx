import React from "react";
import { Button } from "@mui/material";
import { useNotification, NotificationProvider } from "./NotificationContext";

function TriggerNotificationButtonComponent() {
    const { notifyUser } = useNotification();

    return (
        <Button onClick={() => notifyUser("This is a custom notification", "Custom Title", {
            icon: "../../public/images/logo/fav-2.png"  // Add your image URL here
        })}>
            Trigger Notification
        </Button>
    );
}

export default function TriggerNotificationButton() {
    return (
        <NotificationProvider>
            <TriggerNotificationButtonComponent />
        </NotificationProvider>
    );
}
