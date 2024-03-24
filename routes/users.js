const express = require('express');
const { getUserController, updateUserController, 
    followUserController, unfollowUserController,
    blockUserController, unblockUserController,
    getBlockedUsersController, deleteUserController,
    searchUserController } = require('../controllers/userController');
const router = express.Router();

//GET USER
router.get("/:userId", getUserController);

//UPDATE USER
router.put("/update/:userId", updateUserController);

//FOLLOW USER
router.post("/follow/:userId", followUserController);

//UNFOLLOW USER
router.post("/unfollow/:userId", unfollowUserController);

//BLOCK USER
router.post("/block/:userId", blockUserController);

//UNBLOCK USER
router.post("/unblock/:userId", unblockUserController);

//GET BLOCKED USERS
router.get("/blocked/:userId", getBlockedUsersController);

//DELETE USER
router.delete("/delete/:userId", deleteUserController);

//SEARCH USERS
router.get("/search/:query", searchUserController);

module.exports=router;