import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [userResponded, setUserResponded] = useState(false);

    async function notifyUser(notificationText, title, options) {
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

    async function enableNotifsAndClose() {
        try {
            await notifyUser("Thank you for enabling notifications!", "Notifications Enabled", {
                icon: "../../public/images/logo/fav-2.png"  // Add your image URL here
            });
            setUserResponded(true);
        } catch (error) {
            console.error("Error enabling notifications", error);
        }
    }

    function disableNotifsAndClose() {
        setUserResponded(true);
    }

    return (
        <NotificationContext.Provider value={{ notifyUser, enableNotifsAndClose, disableNotifsAndClose, userResponded }}>
            {children}
        </NotificationContext.Provider>
    );
}
