const express = require('express');
const router = express.Router();
const upload=require("../middlewares/upload");
const { createPostController,createPostWithImageController,
    updatePostController, getAllPostsController,
    getUserPostsController, deletePostController,
    likePostController, dislikePostController} = require('../controllers/postController');
const verifyToken = require('../middlewares/verifyToken');

//CREATE POST
router.post("/create",verifyToken,createPostController);

//CREATE POST WITH IMAGE
router.post("/create/:userId",verifyToken,upload.array("images",5),createPostWithImageController);

//UPDATE POST
router.put("/update/:postId",updatePostController);

//GET ALL POSTS
router.get("/all/:userId",getAllPostsController);

//GET USER POSTS
router.get("/user/:userId",getUserPostsController);

//DELETE POST
router.delete("/delete/:postId",deletePostController);

//LIKE POST
router.post("/like/:postId",likePostController);

//DISLIKE POST
router.post("/dislike/:postId",dislikePostController);

module.exports = router;