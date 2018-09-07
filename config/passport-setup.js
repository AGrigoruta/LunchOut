const passport = require('passport')
    , GoogleStrategy = require('passport-google-oauth20')
    , keys = require('./keys')
    , User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
}); //null cuz I doubt the existence of an error

//take that id and get the user from that id
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});  // ok deserializa user when that cokie come sback from the browser


passport.use(
    new GoogleStrategy({
        //options for the google strat
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log('passport callback function fired');
        //console.log(profile);

        //check if user exists in our database
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                //allready have the user
                console.log('User is:', currentUser);
                done(null, currentUser);// serialize the user after done
            } else {
                //if not create user in db
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log("new user created:" + newUser);
                    done(null, newUser); // serialize the user after done
                });
            }
        })

    })
);