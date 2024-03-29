const Post = require("../models/Post");
const User = require("../models/User");
const { CustomError } = require("../middlewares/error");

const createPostController = async (req, res, next) => {
    const { userId, title, description } = req.body;
    try{
        // Validate title and description inputs
        if (!title || !description) {
            throw new CustomError("Title and description are required!", 400);
        }
        if (title.length < 5 || title.length > 100) { 
            throw new CustomError("Title must be between 5 and 100 characters!", 400);
        }
        if (description.length < 10 || description.length > 1000) { 
            throw new CustomError("Description must be between 10 and 1000 characters!", 400);
        }
        const user = await User.findById(userId);
        if(!user){
            throw new CustomError("User not found!", 404);
        }
        const newPost = new Post({
            user:userId,
            title,
            description,
        });
        await newPost.save();
        user.posts.push(newPost._id);
        await user.save();
        res.status(201).json({ message: "Post created successfully!", post: newPost });

    }
    catch(error){
        next(error);
    }
};

const generateFileUrl = (filename) => {
    return process.env.URL + `/uploads/${filename}`;
};

const createPostWithImageController = async (req, res, next) => {
    const { userId } = req.params;
    const {title,description} = req.body;
    const files = req.files;

    try{
        const user = await User.findById(userId);
        if(!user){
            throw new CustomError("User not found!", 404);
        }
        if (!title || !description) {
            throw new CustomError("Title and description are required!", 400);
        }
        if (title.length < 5 || title.length > 100) { 
            throw new CustomError("Title must be between 5 and 100 characters!", 400);
        }
        if (description.length < 10 || description.length > 1000) { 
            throw new CustomError("Description must be between 10 and 1000 characters!", 400);
        }

        const imageUrls = files.map(file=>generateFileUrl(file.filename));
        const newPost = new Post({
            user: userId,
            title,
            description,
            image:imageUrls,
        });
        await newPost.save();
        user.posts.push(newPost._id);
        await user.save();
        res.status(201).json({ message: "Post created successfully!", post: newPost });
    }
    catch(error){
        next(error);
    }
};

const updatePostController = async (req, res, next) => {
    const { postId } = req.params;
    const {title,description} = req.body;
    try{
        const postToUpdate = await Post.findById(postId);
        if(!postToUpdate){
            throw new CustomError("Post not found!", 404);
        }

        if (!title || !description) {
            throw new CustomError("Title and description are required!", 400);
        }
        if (title.length < 5 || title.length > 100) { 
            throw new CustomError("Title must be between 5 and 100 characters!", 400);
        }
        if (description.length < 10 || description.length > 1000) { 
            throw new CustomError("Description must be between 10 and 1000 characters!", 400);
        }
        
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title,
              description },
            { new: true }
        );
        res.status(200).json({ message: "Post updated successfully!", post: updatedPost });
    }
    catch(error){
        next(error);
    }
};
const reSortPosts = async () => {
    try{
        // Query all posts and sort them based on likes and timestamp
        const sortedPosts = await Post.find().sort({ 
            likes: -1, // Sort by number of likes in descending order
            createdAt: -1 // Sort by timestamp in descending order
        });
        return sortedPosts;
    
    }
    catch(error){
        next(error);
    }
};

const getAllPostsController = async (req, res, next) => {
    const { userId } = req.params;
    try{
        const user = await User.findById(userId).populate('posts');     
        if(!user){
            throw new CustomError("User not found!", 404);
        }
        const blockedUserIds = user.blockList.map(id=>id.toString());
        //fetch and sort all posts based on likes and timestamp
        const allPosts = await Post.find({ user: { $nin: blockedUserIds } }
            ).sort({ 
                likes: -1, // Sort by number of likes in descending order
                createdAt: -1 // Sort by timestamp in descending order
            });
        res.status(200).json({ posts: allPosts });
    }
    catch(error){
        next(error);
    }
};

const getUserPostsController = async (req, res, next) => {
    const { userId } = req.params;
    try{
        const user = await User.findById(userId).populate('posts');
        if(!user){
            throw new CustomError("User not found!", 404);
        }
        const userPosts = await Post.find({ user: userId });
        res.status(200).json({ posts: userPosts });
    }
    catch(error){
        next(error);
    }
};

const deletePostController = async (req, res, next) => {
    const { postId } = req.params;
    try{
        const postToDelete = await Post.findById(postId);
        if(!postToDelete){
            throw new CustomError("Post not found!", 404);
        }
        const user =  await User.findById(postToDelete.user);
        if(!user){
            throw new CustomError("User not found!", 404);
        };
        user.posts = user.posts.filter(postId=>postId.toString()!==postToDelete._id.toString());
        await user.save();
        await postToDelete.deleteOne();
        res.status(200).json({ message: "Post deleted successfully!" });
    }
    catch(error){
        next(error);
    }
};

const likePostController = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.body;
    try{
        const post = await Post.findById(postId);
        if(!post){
            throw new CustomError("Post not found!", 404);
        }
        const user = await User.findById(userId);
        if(!user){
            throw new CustomError("User not found!", 404);
        }

        //post owner cannot like their own post
        if(post.user.toString()===userId){
            throw new CustomError("You cannot like your own post!", 404);
        }
        if(post.likes.includes(userId)){
            throw new CustomError("Post already liked!", 404);
        }
        post.likes.push(userId);
        await post.save();
        
        // Custom sorting logic to sort posts based on likes and timestamps
        const sortedPosts = await Post.find().sort({ 
            likes: -1, // Sort by number of likes in descending order
            createdAt: -1 // Sort by timestamp in descending order
        });
        res.status(200).json({ message: "Post liked successfully!", sortedPosts });
    }
    catch(error){
        next(error);
    }
};

const dislikePostController = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req.body;

    try{
        const post = await Post.findById(postId);
        if(!post){
            throw new CustomError("Post not found!", 404);
        }
        const user = await User.findById(userId);
        // Check if the user is the post owner
        if(!user){
            throw new CustomError("User not found!", 404);
        }
        // Check if the user has already liked the post
        if(!post.likes.includes(userId)){
            throw new CustomError("Post not liked!", 404);
        }
        // Remove the user ID from the likes array
        post.likes = post.likes.filter(id=>id.toString()!==userId);
        await post.save();
        // Re-sort posts based on likes and timestamp
        const sortedPosts = await reSortPosts();
        // Return success message and updated list of sorted posts
        res.status(200).json({ message: "Post disliked successfully!" });
    }
    catch(error){
        next(error);
    }
};

module.exports = { createPostController, createPostWithImageController,
    updatePostController, getAllPostsController, 
    getUserPostsController, deletePostController,
    likePostController, dislikePostController};