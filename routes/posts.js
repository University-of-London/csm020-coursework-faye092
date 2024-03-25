const express = require('express');
const router = express.Router();
const { createPostController } = require('../controllers/postController');

//CREATE POST
router.post("/create",createPostController);

//CREATE POST WITH IMAGE

module.exports = router;