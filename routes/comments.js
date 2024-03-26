const express = require('express');
const router = express.Router();
const {createCommentController} = require("../controllers/commentController");

//CREATE COMMENT
router.post("/create",createCommentController);



module.exports = router;