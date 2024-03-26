const express = require('express');
const router = express.Router();
const {createCommentController, createCommentReplyController} = require("../controllers/commentController");

//CREATE COMMENT
router.post("/create",createCommentController);

//CREATE COMMENT REPLY
router.post("/create/reply/:commentId",createCommentReplyController);



module.exports = router;