const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        //if user is not logged in
        res.redirect('/');
    } else {
        //if logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    console.log(req.user);
    //res.send('You are logged in, this is your profile - ' + req.user.username  +' and your email is ' + req.user.email);
    //res.sendFile(__dirname + '/profile.html');
});

module.exports = router;