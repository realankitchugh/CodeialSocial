const Post=require('../models/post')
module.exports.home=function(req, res){
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home MF",
    //         posts: posts
    //     });
    // });

    //Populate the user for each post
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home MF",
            posts: posts
        });
    });
};