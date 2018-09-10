//add this file to .gitignore

module.exports = {
    google:{
        clientID:'479665323924-gdb0bionh92q3h0h5u44pmuq70nol15h.apps.googleusercontent.com',
        clientSecret:'RP9fKdHNIwVdaZV4y0tx_BF4'
    },
    mongodb:{
        dbURI:'mongodb://lunchout:qwerty1234@ds123946.mlab.com:23946/lunch-out-user-database'
    },
    session:{
        cookieKey:'Oancea-Ionut-is-awesome!'
    },

    'facebookAuth' : {
        'clientID': '668203353536162',
		'clientSecret': 'dd9674d2b279b5e3851b9461aa79fe44',
		'callbackURL': 'https://localhost:8080/auth/facebook/callback',
		'profileFields' : ['emails','name']
    }
}