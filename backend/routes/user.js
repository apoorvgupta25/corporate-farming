const express = require('express')
const router = express.Router()

const {getUserById, getUser, getFriends, followUser, UnfollowUser} = require('../controllers/user')
const {isAuthenticated, isSignedIn} = require('../controllers/auth')

router.param('userId', getUserById)

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)


//get friends
router.get("/friends/:userId", getFriends);
//follow a user
router.put("/follow/:currentUserId/:userId", followUser) 
//unfollow a user
router.put("/unfollow/:currentUserId/:userId", UnfollowUser);

module.exports = router;
