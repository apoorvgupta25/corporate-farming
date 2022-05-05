const express = require('express')
const router = express.Router()

const {getUserById, getUser, profilePhoto, getFriends, followUser, UnfollowUser,
    getAllUsers, getAllUnverifiedFarmers, getAllVerifiedFarmers, getAllInvalidFarmers,
    getVerificationEnums, updateVerification, getAllUnverifiedCorporates,
    getAllVerifiedCorporates, getAllInvalidCorporates } = require('../controllers/user')
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
//Unverified Users
router.get('/farmer/unverified/:userId', isSignedIn, isAuthenticated, isAdmin, getAllUnverifiedFarmers)
//Verified Users
router.get('/farmer/verified/:userId', isSignedIn, isAuthenticated, isAdmin, getAllVerifiedFarmers)
//Invalid Users
router.get('/farmer/invalid/:userId', isSignedIn, isAuthenticated, isAdmin, getAllInvalidFarmers)

//Unverified Corporates
router.get('/corporate/unverified/:userId', isSignedIn, isAuthenticated, isAdmin, getAllUnverifiedCorporates)
//Verified Corporates
router.get('/corporate/verified/:userId', isSignedIn, isAuthenticated, isAdmin, getAllVerifiedCorporates)
//Invalid Corporates
router.get('/corporate/invalid/:userId', isSignedIn, isAuthenticated, isAdmin, getAllInvalidCorporates)

router.get('/verification/enums/:userId', isSignedIn, isAuthenticated, isAdmin, getVerificationEnums)
router.put('/verification/update/:usersId/:userId', isSignedIn, isAuthenticated, isAdmin, updateVerification)

module.exports = router;
