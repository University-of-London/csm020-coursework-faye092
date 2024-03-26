const express = require('express');
const router = express.Router();
const upload=require("../middlewares/upload");
const { createPostController,createPostWithImageController,
    updatePostController, getAllPostsController,
    getUserPostsController, deletePostController } = require('../controllers/postController');

//CREATE POST
router.post("/create",createPostController);

//CREATE POST WITH IMAGE
router.post("/create/:userId",upload.array("images",5),createPostWithImageController);

//UPDATE POST
router.put("/update/:postId",updatePostController);

//GET ALL POSTS
router.get("/all/:userId",getAllPostsController);

//GET USER POSTS
router.get("/user/:userId",getUserPostsController);

//DELETE POST
router.delete("/delete/:postId",deletePostController);

module.exports = router;