const Post = require('../models/post');
const User=require('../models/user');
module.exports.home = async function(req, res){
    try{
        //populate the users of each post
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate("user") // then populating the user field  with info user info it is ref to via user ID.
        .populate({
            path : "comments" , // populating all comments with comments its refering to via it comment ID its refering to.
            populate : { // then populating the each comment's field user with user's info it is refering to.
                path : "user"
            }
        });
        let users=await User.find({});
    
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });
    }catch(err){
        console.log('Error', err);
        return;
    }
}
