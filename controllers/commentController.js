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

        // Check if the user is the owner of the post
        if(post.user.toString()===userId){
            throw new CustomError("You cannot comment on your own post!", 404);
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

const createCommentReplyController = async (req, res, next) => {
    const { commentId } = req.params;
    const { text,userId } = req.body;
    try{
        const parentComment = await Comment.findById(commentId);
        if(!parentComment){
            throw new CustomError("Parent Comment not found!", 404);
        }

        const user = await User.findById(userId);
        if(!user){
            throw new CustomError("User not found!", 404);
        }

        const reply = {
            user: userId,
            text,
        };
        parentComment.replies.push(reply);
        await parentComment.save();

        res.status(201).json({ message: "Comment reply created successfully!", reply });
    }
    catch(error){
        next(error);
    }
};

const updateCommentController=async (req,res,next)=>{

    const {commentId}=req.params;
    const {text}=req.body;

    try{
        const commentToUpdate=await Comment.findById(commentId);
        if(!commentToUpdate){
            throw new CustomError("Comment not found!",404);
        }

        const updatedComment=await Comment.findByIdAndUpdate(commentId,
            {text},{new:true});

        res.status(200).json({message:"Comment updated successfully!",updatedComment});

    }
    catch(error){
        next(error);
    }
};

const updateReplyCommentController=async(req,res,next)=>{

    const {commentId,replyId}=req.params;
    const {text,userId}=req.body;
    try{
        const comment=await Comment.findById(commentId);
        if(!comment){
            throw new CustomError("Comment not found!",404);
        }

        const replyIndex=comment.replies.findIndex((reply)=>reply._id.toString()===replyId)
        if(replyIndex===-1){
            throw new CustomError("Reply not found!",404);
        }

        if(comment.replies[replyIndex].user.toString()!==userId){
            throw new CustomError("You can only update your comments",404);
        }

        comment.replies[replyIndex].text=text;

        await comment.save();
        res.status(200).json({message:"Reply updated successfully!",comment});

    }
    catch(error){
        next(error);
    }
};

const popuateUserDetails=async(comments)=>{
    for(const comment of comments){ 
        await comment.populate('user','username fullname profilePicture');
        if(comment.replies.length>0){
            await comment.populate('replies.user','username fullname profilePicture');
        }
    }
};

const getCommentsByPostController=async(req,res,next)=>{
    const {postId}=req.params;
    try{
        const post = await Post.findById(postId);
        if(!post){
            throw new CustomError("Post not found!", 404);
        }

        let comments = await Comment.find({ post: postId }).sort({ 
            createdAt: -1 // Sort by timestamp in descending order
        });

        await popuateUserDetails(comments);     

        res.status(200).json({comments});
    }
    catch(error){
        next(error);
    }
};

const deleteCommentController=async(req,res,next)=>{
    const {commentId}=req.params;
    try{
        const comment = await Comment.findById(commentId);
        if(!comment){
            throw new CustomError("Comment not found!", 404);
        }

        await Post.findOneAndUpdate(
            {comments:commentId},
            {$pull:{comments:commentId}},
            {new:true}
        );
        
        await comment.deleteOne();
        res.status(200).json({message:"Comment deleted successfully!"});

    }
    catch(error){
        next(error);
    }  
};

const deleteReplyCommentController=async(req,res,next)=>{
    const {commentId,replyId}=req.params
    try{
        const comment=await Comment.findById(commentId);
        if(!comment){
            throw new CustomError("Comment not found!",404);
        }

        comment.replies=comment.replies.filter(id=>id.toString()!==replyId);

        await comment.save();

        res.status(200).json({message:"Reply deleted successfully!"});

    }
    catch(error){
        next(error);
    }
};

module.exports = {createCommentController, createCommentReplyController,
    updateCommentController, updateReplyCommentController,
    getCommentsByPostController, deleteCommentController,
    deleteReplyCommentController};