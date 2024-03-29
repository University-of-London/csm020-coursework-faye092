const express = require('express');
const { getUserController, updateUserController, 
    followUserController, unfollowUserController,
    blockUserController, unblockUserController,
    getBlockedUsersController, deleteUserController,
    searchUserController, uploadProfilePictureController,
    uploadCoverPictureController } = require('../controllers/userController');
const upload=require("../middlewares/upload");
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

//GET USER
router.get("/:userId",verifyToken, getUserController);

//UPDATE USER
router.put("/update/:userId",verifyToken, updateUserController);

//FOLLOW USER
router.post("/follow/:userId",verifyToken, followUserController);

//UNFOLLOW USER
router.post("/unfollow/:userId",verifyToken, unfollowUserController);

//BLOCK USER
router.post("/block/:userId",verifyToken, blockUserController);

//UNBLOCK USER
router.post("/unblock/:userId",verifyToken, unblockUserController);

//GET BLOCKED USERS
router.get("/blocked/:userId",verifyToken, getBlockedUsersController);

//DELETE USER
router.delete("/delete/:userId",verifyToken, deleteUserController);

//SEARCH USERS
router.get("/search/:query", searchUserController);

//UPDATE PROFILE PICTURE
router.put("/update-profile-picture/:userId",upload.single("profilePicture"),uploadProfilePictureController);

//UPDATE COVER PICTURE
router.put("/update-cover-picture/:userId",upload.single("coverPicture"),uploadCoverPictureController);

module.exports=router;