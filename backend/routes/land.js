const express = require('express')
const router = express.Router()

const {getLandById, addLand, getLand, photo, landPDF, getAllLands, updateLand, removeLand,
    getVerificationEnums, updateVerification, getAdminLands } = require('../controllers/land')
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

router.get('/lands/admin/:userId', isSignedIn, isAuthenticated, isAdmin, getAdminLands);

router.get('/verification/land/enums/:userId', isSignedIn, isAuthenticated, isAdmin, getVerificationEnums)
router.put('/verification/land/update/:landId/:userId', isSignedIn, isAuthenticated, isAdmin, updateVerification)

module.exports = router;
