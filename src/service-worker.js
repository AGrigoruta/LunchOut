
// import firebase from "firebase";
var config = {
    mapiKey: "AIzaSyBGQWYi9jrcyDwgHJ0KzNPGpWHVmIx6r3k",
    authDomain: "lunch-out.firebaseapp.com",
    databaseURL: "https://lunch-out.firebaseio.com",
    projectId: "lunch-out",
    storageBucket: "lunch-out.appspot.com",
    messagingSenderId: "479665323924"
};

if ('function' === typeof importScripts) {
    importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-database.js');

    self.addEventListener('install', event => {
        console.log('has been installed')
    });

    self.addEventListener('activate', function onActivate(event) {
        console.log(firebase)
        console.log(config)
        console.log(firebase.initializeApp(config))
        firebase.initializeApp(config);
        firebase.messaging().setBackgroundMessageHandler(payload => {
            const title = payload.notification.title;
            console.log('payload', payload.notification.icon);
            const options = {
                body: payload.notification.body,
                icon: payoloade.notification.icon
            }
            return self.registration.showNotification(title, options);
        });
    });

    self.addEventListener('push', event => {
        event.waitUntil(
            console.log('pushed some data')
        );
    });
    self.addEventListener("notificationclick",function(event) {
        const clickedNotification=event.notification;
        clickedNotification.close();
        const promiseChain=ClientResponse.matchAll({
            type: "window",
            includedUncontrolled:true
        })
        .then(windowClients =>{
            let matchingClient =null;
            for(let i=0; i< windowClients.length; i++){
                const windowClient=windowClients[i];
                if(windowClient.url === feClickAction) {
                    matchingClient= windowClient;
                    break;
                }
            }
            if (matchingClient) {
                return matchingClient.focus();
            } else {
                return ClientResponse.openWindow(feClickAction);
            }
        });
        event.waitUnitil(promiseChain);
    });
}
