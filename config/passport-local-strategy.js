const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');

//Authentication using Passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
// Find a user and establish the identity
        User.findOne({email: email}, function(err, user){
            if(err){
                req.flash("error", err)
                return done(err);
            }
            if(!user || user.password != password){
                // console.log('invalid username or password');
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        });
    }

));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


//Deserializing the user from the key in the cokies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){console.log('Error in finding user'); return done(err);}
        return done(null, user);
    });
});

//check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if user is signed in, pass the req of the user to the controller action
    if(req.isAuthenticated()){
        return next();
    }

    //if(user is not signed in) redirect the user back to the sign in page
    return res.redirect('/users/sign-in');
}

passport.checkAuth =function(req, res, next){
    if(req.query.post_id == req.user.id){
        return next();
    }
    return res.redirect('back');

}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

// passport.checkSignedIn = function(req, res, next){
//     if(!req.isAuthenticated()){
//         next();    
//     }
//     return res.redirect('/users/profile');
// }

module.exports=passport;