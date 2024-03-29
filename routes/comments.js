const express = require('express');
const router = express.Router();
const {createCommentController, createCommentReplyController,
    updateCommentController, updateReplyCommentController,
    getCommentsByPostController, deleteCommentController,
    deleteReplyCommentController} = require("../controllers/commentController");

//CREATE COMMENT
router.post("/create",createCommentController);

//CREATE COMMENT REPLY
router.post("/create/reply/:commentId",createCommentReplyController);

//UPDATE COMMENT
router.put("/update/:commentId",updateCommentController);

//UPDATE REPLY COMMENT
router.put("/update/:commentId/replies/:replyId",updateReplyCommentController);

//GET ALL POST COMMENTS
router.get("/post/:postId",getCommentsByPostController);

//DELETE A COMMENT
router.delete("/delete/:commentId",deleteCommentController);

//DELETE A REPLY COMMENT
router.delete("/delete/:commentId/replies/:replyId",deleteReplyCommentController);

module.exports = router;

// Path: controllers/commentController.js