import firebase from "firebase";
//import firebase from "./inits/init-firebase";

if ('function' === typeof importScripts) {
    importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-database.js');

    self.addEventListener('install', event => {
        console.log('Self has been installed (Firebase Notifications) ')
    });

    self.addEventListener('activate', function onActivate(event) {
        firebase.messaging().setBackgroundMessageHandler(payload => {
            const title = payload.notification.title;
            console.log('Payload for notifications : ', payload.notification.icon);
            const options = {
                body: payload.notification.body,
                icon: payoloade.notification.icon
            }
            return self.registration.showNotification(title, options);
        });
    });

    self.addEventListener('push', event => {
        event.waitUntil(
            console.log('Pushed data to firebase !')
        );
    });
    self.addEventListener("notificationclick", function (event) {
        const clickedNotification = event.notification;
        clickedNotification.close();
        const promiseChain = ClientResponse.matchAll({
                type: "window",
                includedUncontrolled: true
            })
            .then(windowClients => {
                let matchingClient = null;
                for (let i = 0; i < windowClients.length; i++) {
                    const windowClient = windowClients[i];
                    if (windowClient.url === feClickAction) {
                        matchingClient = windowClient;
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