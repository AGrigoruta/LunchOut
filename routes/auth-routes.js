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
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send(req.user);
    // res.redirect('/profile');
})
module.exports = router;
