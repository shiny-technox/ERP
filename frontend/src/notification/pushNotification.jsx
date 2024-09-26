import React from 'react';

function pushNotification(id, title, message, includeTime = false) {
  if ('Notification' in window) {
    // Check if notification permissions have already been granted
    if (Notification.permission === 'granted') {
      checkAndShowNotification(id, title, message, includeTime);
    } else if (Notification.permission !== 'denied') {
      // Otherwise, ask the user for permission
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          checkAndShowNotification(id, title, message, includeTime);
        }
      });
    }
  } else {
    console.error("This browser does not support desktop notification");
  }
}

function checkAndShowNotification(id, title, message, includeTime) {
  const notificationId = `${id}_${new Date().toLocaleDateString()}`;
  const alreadyNotified = localStorage.getItem(notificationId);

  if (!alreadyNotified) {
    showNotification(title, message, includeTime);
    localStorage.setItem(notificationId, 'true');
  }
}

function showNotification(title, message, includeTime) {
  const notificationOptions = {
    body: includeTime ? `${message} at ${new Date().toLocaleTimeString()}` : message,
    icon: "" // Add the path to your icon if you have one
  };
  new Notification(title, notificationOptions);
}

export default pushNotification;
