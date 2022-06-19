const User=require('../models/user');
module.exports.userHome=function(req, res){
    res.send("<h1> Users </h1>");
}
//render the sign up page
module.exports.signup = function(req, res){
    res.render('sign_up', {
        title: "Sign Up Page"
    });
}
//render the sign in page
module.exports.signin = function(req, res){
    res.render('sign_in', {
        title: "Sign-in Page"
    });
} 

module.exports.userProfile=function(req, res){
    return res.render('profile', {
        title: "User Profile MF"
    });
}

module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        // alert("Passwords dont match");
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up',err); return}

                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }

    });
}


//Sign in and create the session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}