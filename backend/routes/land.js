const express = require('express')
const router = express.Router()

const {getLandById, addLand, getLand, photo, landPDF, getAllLands, updateLand, removeLand,
    getVerificationEnums, updateVerification, getAllUnverifiedLands,
    getAllVerifiedLands, getAllInvalidLands } = require('../controllers/land')
const {getUserById} = require('../controllers/user')
const {isFarmer, isAuthenticated, isSignedIn, isAdmin} = require('../controllers/auth')

router.param('landId', getLandById);
router.param('userId', getUserById);

router.post('/land/add/:userId', isSignedIn, isAuthenticated, isFarmer, addLand);

router.get('/land/:landId', getLand);
router.get('/land/photo/:landId', photo);
router.get('/land/pdf/:landId', landPDF);

router.put('/land/:landId/:userId', isSignedIn, isAuthenticated, isFarmer, updateLand);

router.delete('/land/:landId/:userId', isSignedIn, isAuthenticated, isFarmer, removeLand);

router.get('/lands', getAllLands);

//Unverified Lands
router.get('/land/unverified/:landId', isSignedIn, isAuthenticated, isAdmin, getAllUnverifiedLands)
//Verified Lands
router.get('/land/verified/:landId', isSignedIn, isAuthenticated, isAdmin, getAllVerifiedLands)
//Invalid Lands
router.get('/land/invalid/:landId', isSignedIn, isAuthenticated, isAdmin, getAllInvalidLands)

router.get('/verification/enums/:userId', isSignedIn, isAuthenticated, isAdmin, getVerificationEnums)
router.put('/verification/update/:landId/:userId', isSignedIn, isAuthenticated, isAdmin, updateVerification)

module.exports = router;
