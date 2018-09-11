const passport = require('passport')
    , keys = require('./keys')
    , User = require('../models/user-model')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    callbackURL: 'https://localhost:8080/auth/facebook/callback',
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    profileFields: keys.facebook.profileFields,
},
    (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log('passport callback function fired');
        //console.log(profile);

        //check if user exists in our database
        User.findOne({ authId: profile.id }).then((currentUser) => {
            if (currentUser) {
                //allready have the user
                console.log('User is:', currentUser);
                done(null, currentUser);// serialize the user after done
            } else {
                //if not create user in db
                new User({
                    username: profile.name.familyName + " " + profile.name.givenName,
                    authId: profile.id,
                    email: profile.emails[0].value,
                    thumbnail: "graph.facebook.com/"+ profile.id + "/picture" + "?width=200&height=200" + "&access_token=" + accessToken,
                    loggedWith: "Facebook"
                }).save().then((newUser) => {
                    console.log("new user created:" + newUser);
                    done(null, newUser); // serialize the user after done
                });
            }
        })
    }

));