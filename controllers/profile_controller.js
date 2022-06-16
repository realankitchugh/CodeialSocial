const User = require("../models/user")

module.exports.userProfile=function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(user){
                return res.render('profile', {
                    title: "User Profile MF",
                    user:  user
                });
            }
            return res.redirect('/users/sign-in');

        });
    }
    else{
        return res.redirect('/users/sign-in')
    }
}