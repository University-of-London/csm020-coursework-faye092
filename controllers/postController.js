const Post = require("../models/Post");
const User = require("../models/User");
const { CustomError } = require("../middlewares/error");

const createPostController = async (req, res, next) => {
    const { userId, caption } = req.body;
    try{
        const user = await User.findById(userId);
        if(!user){
            throw new CustomError("User not found!", 404);
        }
        const newPost = new Post({
            user:userId,
            caption,
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
    const {caption} = req.body;
    const files = req.files;

    try{
        const user = await User.findById(userId);
        if(!user){
            throw new CustomError("User not found!", 404);
        }
        const imageUrls = files.map(file=>generateFileUrl(file.filename));
        const newPost = new Post({
            user: userId,
            caption,
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

module.exports = { createPostController, createPostWithImageController };