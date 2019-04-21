import firebase from "firebase";
var config = {
    mapiKey: "AIzaSyBGQWYi9jrcyDwgHJ0KzNPGpWHVmIx6r3k",
    authDomain: "lunch-out.firebaseapp.com",
    databaseURL: "https://lunch-out.firebaseio.com",
    projectId: "lunch-out",
    storageBucket: "lunch-out.appspot.com",
    messagingSenderId: "479665323924"
}
console.log("Firebase has beeen initialized !");
const firebaseApp = firebase.initializeApp(config);
export default firebaseApp;