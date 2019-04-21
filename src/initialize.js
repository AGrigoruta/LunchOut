import firebase from "firebase";
import firebaseApp from "./inits/init-firebase"

let InitializePush = () => {
    const messaging = firebaseApp.firebase_.messaging();
    messaging
        .requestPermission()
        .then(() => {
            console.log("Have Permission");
            return messaging.getToken();
        })
        .then(token => {
            window.FCMToken = token;
            console.log("FCM Token: ", token);
            firebase
                .database()
                .ref(`tokens/{token}`)
                .set(token);
        })
        .catch(error => {
            if (error.code === "messaging/permission-blocked") {
                console.log("Please Unblock Notification Request Manually");
            } else {
                console.log("Error Ocurred", error);
            }
        });
    messaging.onMessage(payload => {
        console.log("Notification Received", payload);
    });
}

export {
    InitializePush
};