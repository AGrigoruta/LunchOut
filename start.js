const express = require('express')
    , app = express()
    , port = 8080
    , authRoutes = require('./routes/auth-routes')
    , eventRoutes = require('./routes/event-routes')
    , profileRoutes = require('./routes/profile-routes')
    , mongoose = require('mongoose')
    , keys = require('./config/keys')
    , cookieSession = require('cookie-session') // securing the session
    , passport = require('passport')
    , https = require("https")
    , fs = require('fs')
    , bodyParser = require('body-parser')
    , session = require('express-session');    

const options = {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.crt'),
        requestCert: false,
        rejectUnauthorized: false
};


app.use(express.static('build'));
app.use(bodyParser.json({useNewUrlParser: true}));

require('./config/passport')(app);



app.use('/auth', authRoutes); //index/auth/...
app.use('/api', eventRoutes); //index/api/...
app.use('/profile', profileRoutes); //index/profile/...

// app.use(cookieSession({
//     maxAge: 25 * 60 * 60 * 1000, // the cookie will last a day
//     keys: [keys.session.cookieKey]
// }));



app.get('*', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});
//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI , {useNewUrlParser: true}, ()=>{
    console.log('Connected to DB! \n\n');
});


const server = https.createServer(options,app).listen(port,function(){
    console.log("Server started at port :"+port);
});

