const router = require('express').Router(),
    express = require('express'),
    passport = require('passport'),
    app = express();

//auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.send('logging out');
    res.redirect('/')
    //handle with pasaport
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
));

//auth fb
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
}));
router.get('/facebook/callback', passport.authenticate('facebook',
    { successRedirect: '/user',
    failureRedirect: '/' 
}))

router.get('/logged', (req, res) => {
    res.send({
        authenticated: req.isAuthenticated(),
        user: req.user ? req.user : null
    })
})

module.exports = router;