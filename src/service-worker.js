
// import firebase from "firebase";

if ('function' === typeof importScripts) {
    importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-database.js');
    self.addEventListener('install', event => {
        console.log('has been installed')
    });

    self.addEventListener('activate', function onActivate(event) {
        firebase.initializeApp({
            'messagingSenderId': '479665323924'
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
