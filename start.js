const express = require('express')
    , session = require('express-session')
    , app = express()
    , port = 8080
    , authRoutes = require('./routes/auth-routes')
    , eventRoutes = require('./routes/event-routes')
    , profilePageRoutes = require('./routes/profilePage-routes')
    , profileRoutes = require('./routes/profile-routes')
    , passportSetupGoogle = require('./config_project/passport-setup-google')
    , passportSetupFacebook = require ('./config_project/passport-setup-facebook')
    , mongoose = require('mongoose')
    , keys = require('./config_project/keys')
    , cookieSession = require('cookie-session') // securing the session
    , passport = require('passport')
    , https = require("https")
    , fs = require('fs')
    , bodyParser = require('body-parser')
    , firebase= require("firebase");

const options = {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.crt'),
        requestCert: false,
        rejectUnauthorized: false
};

const server = https.createServer(options,app).listen(port,function(){
        console.log("Server started at port :"+port);
});
app.use(bodyParser.json({useNewUrlParser: true}));

//initialize passport
app.use(session({
    secret: 'asdf',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('build'));


app.use('/auth', authRoutes); //index/auth/...
app.use('/api', eventRoutes); //index/api/...
app.use('/profile', profileRoutes); //index/profile/...
app.use('/profilePage',profilePageRoutes);
// app.use(cookieSession({
//     maxAge: 25 * 60 * 60 * 1000, // the cookie will last a day
//     keys: [keys.session.cookieKey]
// }));

app.get("/firebase-messaging-sw.js", (req, res) => {
    res.sendFile(__dirname + "/src/firebase-messaging-sw.js");
  });
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});
//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI , {useNewUrlParser: true}, ()=>{
    console.log('Connected to DB! \n\n');
});
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBGQWYi9jrcyDwgHJ0KzNPGpWHVmIx6r3k",
    authDomain: "lunch-out.firebaseapp.com",
    databaseURL: "https://lunch-out.firebaseio.com",
    storageBucket: "lunch-out.appspot.com",
  };
  firebase.initializeApp(config);

  var admin = require("firebase-admin");

  var serviceAccount = require("./lunch-out-firebase-adminsdk-nnu70-0a83cebffe.json");
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lunch-out.firebaseio.com"
  });
