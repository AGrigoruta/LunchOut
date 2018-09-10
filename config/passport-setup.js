const passport = require('passport')
    , GoogleStrategy = require('passport-google-oauth20')
    , keys = require('./keys')
    , User = require('../models/user-model')
    , FacebookStrategy = require('passport-facebook').Strategy;

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

passport.use(new FacebookStrategy({
    clientID: keys.facebookAuth.clientID,
    clientSecret: keys.facebookAuth.clientSecret,
    callbackURL: keys.facebookAuth.callbackURL,
    profileFields: keys.facebookAuth.profileFields
  },
  function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            User.findOne({'facebook.id': profile.id}, function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, user);
                else {
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.familyName + " " + profile.name.givenName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.facebook.photo = "graph.facebook.com/"+ profile.id + "/picture" + "?width=200&height=200" + "&access_token=" + accessToken;

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                    console.log(profile);
                }
            });
        });
    }

));