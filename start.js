const express = require('express')
    , app = express()
    , port = 8080
    , authRoutes = require('./routes/auth-routes')
    , profileRoutes = require('./routes/profile-routes')
    , passportSetup = require('./config/passport-setup')
    , mongoose = require('mongoose')
    , keys = require('./config/keys')
    , cookieSession = require('cookie-session') // securing the session
    , passport = require('passport');

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.use(cookieSession({
    maxAge: 25 * 60 * 60 * 1000, // the cookie will last a day
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongoDB
mongoose.connect((keys.mongodb.dbURI), () => {
    console.log('connected to mongodb');
})

app.use('/auth', authRoutes); //index/auth/...
app.use('/profile', profileRoutes); //index/profile/...

app.listen(port, () => {
    console.log("App now listening for req on port " + port);
})
