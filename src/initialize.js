
import firebase from "firebase";


let InitializePush = () => {

    var config = {
        mapiKey: "AIzaSyBGQWYi9jrcyDwgHJ0KzNPGpWHVmIx6r3k",
        authDomain: "lunch-out.firebaseapp.com",
        databaseURL: "https://lunch-out.firebaseio.com",
        projectId: "lunch-out",
        storageBucket: "lunch-out.appspot.com",
        messagingSenderId: "479665323924"
    };
    console.log("ababa");
    const firebaseApp = firebase.initializeApp(config);
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

export {InitializePush};