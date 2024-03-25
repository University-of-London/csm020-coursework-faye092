const express = require('express');
const router = express.Router();
const upload=require("../middlewares/upload");
const { createPostController,createPostWithImageController } = require('../controllers/postController');

//CREATE POST
router.post("/create",createPostController);

//CREATE POST WITH IMAGE
router.post("/create/:userId",upload.array("images",5),createPostWithImageController);

module.exports = router;