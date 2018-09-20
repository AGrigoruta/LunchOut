const passport = require('passport')
    , session = require('express-session')
    , GoogleStrategy = require('passport-google-oauth20')
    , FacebookStrategy = require('passport-facebook').Strategy
    , keys = require('./keys')
    , User = require('../models/user-model')
    , event = require('../models/event-model')
    , request = require('request');

module.exports = function (app) {
    //initialize passport
    app.use(session({
        secret: 'Ketonal Gel',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    }); //null cuz I doubt the existence of an error

    //take that id and get the user from that id
    passport.deserializeUser((id, done) => {
        User.findById(id).then((user, err) => {
            done(err, user);
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
            User.findOne({ authId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    //allready have the user
                    console.log('User is:', currentUser);
                    done(null, currentUser);// serialize the user after done
                } else {
                    //if not create user in db
                    new User({
                        username: profile.displayName,
                        authId: profile.id,
                        email: profile.emails[0].value,
                        thumbnail: profile._json.image.url,
                        loggedWith: "Google"
                    }).save().then((newUser) => {
                        console.log("new user created:" + newUser);
                        done(null, newUser); // serialize the user after done
                    });
                }
            })

        })
    );

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
                    //allready have the user and that user has an event 
                    event.findOne({ 'creatorID': currentUser.authId }, function (err, res) {
                        var find;
                        if (res) find = true;
                        else find = false;
                        console.log("######################################");
                        console.log("Hell is " + find);
                        console.log("######################################\n");
                    })
                    console.log('User is:', currentUser);
                    done(null, currentUser);// serialize the user after done
                } else {
                    //if not create user in db
                    var imageUrl = "https://graph.facebook.com/" + profile.id + "/picture" + "?width=200&height=200&redirect=false" + "&access_token=" + accessToken;
                    request(imageUrl, { json: true }, (err, res, body) => {
                        if (err) { return console.log(err); }
                        new User({
                            username: profile.name.familyName + " " + profile.name.givenName,
                            authId: profile.id,
                            email: profile.emails[0].value,
                            thumbnail: body.data.url,
                            loggedWith: "Facebook"
                        }).save().then((newUser) => {
                            console.log("new user created:" + newUser);
                            done(null, newUser); // serialize the user after done
                        });
                    });


                    // new event({
                    // participantsID: ["Hello Ma Friend"],
                    // creatorId : profile.id,
                    // schemaId : "1",
                    // location : " here",
                    // startTime: " 15:15",
                    // participantsNr: 8,
                    // date: "11.09.2018",
                    // status: "ONGOING",

                    //  }).save().then((newEvent)=>{

                    //     console.log("new event created: " + newEvent);
                    //     done(null, newEvent);

                    // });



                }

            }
            )
        }

    ));
}