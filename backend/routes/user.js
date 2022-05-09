const express = require('express')
const router = express.Router()

const {getUserById, getUser, profilePhoto, getFriends, followUser, UnfollowUser,
    getAllUsers, getAdminUsers, getVerificationEnums, updateVerification } = require('../controllers/user')
const {isAuthenticated, isSignedIn, isAdmin} = require('../controllers/auth')

router.param('userId', getUserById)
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)
router.get('/user/profile/photo/:userId', profilePhoto);


//get friends
router.get("/friends/:userId", getFriends);
//follow a user
router.put("/follow/:currentUserId/:userId/", followUser)
//unfollow a user
router.put("/unfollow/:currentUserId/:userId", UnfollowUser);

//All Users
router.get('/user/all/:userId', isSignedIn, isAuthenticated, isAdmin, getAllUsers)

router.get('/user/admin/:userId', isSignedIn, isAuthenticated, isAdmin, getAdminUsers);

router.get('/verification/enums/:userId', isSignedIn, isAuthenticated, isAdmin, getVerificationEnums)
router.put('/verification/update/:usersId/:userId', isSignedIn, isAuthenticated, isAdmin, updateVerification)

module.exports = router;
