const User=require('../models/user');
const fs=require('fs');
const path=require('path');


module.exports.userHome=function(req, res){
    res.send("<h1> Users </h1>");
}
//render the sign up page
module.exports.signup = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('sign_up', {
        title: "Sign Up Page"
    });
}
//render the sign in page
module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('sign_in', {
        title: "Sign-in Page"
    });
} 

module.exports.userProfile=function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('profile', {
            title: "User Profile MF",
            profile_user: user
        });
    });
    
}

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    // }

    if(req.user.id == req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('%%%%%%%multer error', err);
                }
                console.log(req.file);
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    //saving the path of the uploaded file into the avatar field in the User
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            console.log('Error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }


}

module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        // alert("Passwords dont match");
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return;}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up',err); return;}

                return res.redirect('/users/sign-in');
            });
        }else{
            return res.redirect('back');
        }

    });
}


//Sign in and create the session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    req.logout(function(err){
        if(err){return next(err);}
        req.flash('success', 'Logged out successfully');
        return res.redirect('/');
    });
}
