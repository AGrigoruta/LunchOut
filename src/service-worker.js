if ('function' === typeof importScripts) {
    importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-database.js');

    self.addEventListener('install', event => {
        console.log('Self has been installed (Firebase Notifications) ')
    });

    self.addEventListener('activate', function onActivate(event) {
        firebase.messaging().setBackgroundMessageHandler(payload => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.body,
                icon: payload.notification.icon || './view/images/LunchOut.png'
            }
            return self.registration.showNotification(title, options);
        });
    });

    self.addEventListener('push', event => {
        event.waitUntil(
            console.log(event)
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

function displayNotification(payload, tag = 'common-tag') {
    const title = 'LunchOut';

    return self.clients.matchAll({
        type: 'window'
    }).then(windowClients => {
        if (windowClients.filter(client => client.focused).length === 0) {
            return self.registration.showNotification(title, {
                icon: './view/images/LunchOut.png',
                tag,
                vibrate: [100, 50, 100, 50, 100, 50],
                requireInteraction: false
            });
        }
        return true;
    });
}