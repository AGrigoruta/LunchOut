const router = require('express').Router()
    , express = require('express')
    , passport = require('passport')
    , app = express();

//auth logout
router.get('/logout', (req, res) => {
    req.logout();
    // res.redirect('/')
    //handle with pasaport
    res.send('logging out');
})

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

//callback for google to redirect to
router.get('/google/redirect', passport.authenticate('google',

    { 
        successRedirect: '/user',
        failureRedirect: '/' 
    }
    // res.redirect('/profile');
));


    // res.redirect('/profile');


// router.get('/google/redirect', 
// 	  passport.authenticate('google', { successRedirect: '/profile',
// 	                                      failureRedirect: '/' }))

//auth fb
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook',
    // res.send({
    //     credentials: req.user,
    //     logged: true,
    // });
    { successRedirect: '/user',
    failureRedirect: '/' 
}))
/*router.get('/facebook/callback', passport.authenticate('facebook',{
        successRedirect: '/profile.html',
        failureRedirect: '/'
    })

);*/

router.get('/logged', function (req, res) {
    res.send({
        authenticated: req.isAuthenticated(),
        user: req.user ? req.user : null
    });
});

module.exports = router;