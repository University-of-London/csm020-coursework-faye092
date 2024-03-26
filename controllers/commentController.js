const CustomError = require('../middlewares/error');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

const createCommentController = async (req, res, next) => {
    const { userId, postId, text } = req.body;
    try{
        const post = await Post.findById(postId);
        if(!post){
            throw new CustomError("Post not found!", 404);
        }
        const user = await User.findById(userId);
        if(!user){
            throw new CustomError("User not found!", 404);
        }
        const newComment = new Comment({
            user: userId,
            post: postId,
            text,
        });
        await newComment.save();
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({ message: "Comment created successfully!", comment: newComment });

    }
    catch(error){
        next(error);
    }
};


module.exports = {createCommentController};