const express = require('express');
const router = express.Router();
const {createCommentController, createCommentReplyController,
    updateCommentController, updateReplyCommentController} = require("../controllers/commentController");

//CREATE COMMENT
router.post("/create",createCommentController);

//CREATE COMMENT REPLY
router.post("/create/reply/:commentId",createCommentReplyController);

//UPDATE COMMENT
router.put("/update/:commentId",updateCommentController);

//UPDATE REPLY COMMENT
router.put("/update/:commentId/replies/:replyId",updateReplyCommentController);

module.exports = router;