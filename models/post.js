const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    //include the array of ids of all the comments in this post
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
}, {
    timestamps: true
});
const post=mongoose.model('post', postSchema);
module.exports=post;