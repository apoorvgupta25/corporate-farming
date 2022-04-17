const express = require('express')
const router = express.Router()

const {getUserById, getUser, getFriends, followUser, UnfollowUser,
    getAllUsers, getAllUnverifiedFarmers, getAllVerifiedFarmers, getAllInvalidFarmers,
    getVerificationEnums, updateVerification} = require('../controllers/user')
const {isAuthenticated, isSignedIn, isAdmin} = require('../controllers/auth')

router.param('userId', getUserById)
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)


//get friends
router.get("/friends/:userId", getFriends);
//follow a user
router.put("/follow/:currentUserId/:userId/", followUser)
//unfollow a user
router.put("/unfollow/:currentUserId/:userId", UnfollowUser);

//All Users
router.get('/user/all/:userId', isSignedIn, isAuthenticated, isAdmin, getAllUsers)
//Unverified Users
router.get('/farmer/unverified/:userId', isSignedIn, isAuthenticated, isAdmin, getAllUnverifiedFarmers)
//Verified Users
router.get('/farmer/verified/:userId', isSignedIn, isAuthenticated, isAdmin, getAllVerifiedFarmers)
//Invalid Users
router.get('/farmer/invalid/:userId', isSignedIn, isAuthenticated, isAdmin, getAllInvalidFarmers)

router.get('/verification/enums/:userId', isSignedIn, isAuthenticated, isAdmin, getVerificationEnums)
router.put('/verification/update/:farmerId/:userId', isSignedIn, isAuthenticated, isAdmin, updateVerification)

module.exports = router;
