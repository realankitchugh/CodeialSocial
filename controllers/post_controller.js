const Post=require('../models/post');
const comment= require('../models/comment');
module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user
        });
        if(req.xhr){
            req.flash('success', "Post Created!!!");
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!'
            });
        }

        // req.flash('success', "Post added");
        return res.redirect('back');
    }catch(err){
        console.log('Error', err);
    }
}

module.exports.destroy = async function(req, res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user == req.user.id){
            await comment.deleteMany({post: req.params.id});
            post.remove();
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post Deleted"
                });
            }
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error', err);
    }
}