const express = require('express')
const router = express.Router()

const {getLandById, addLand, getLand, photo, getAllLands, updateLand, removeLand} = require('../controllers/land')
const {getUserById} = require('../controllers/user')
const {isFarmer, isAuthenticated, isSignedIn} = require('../controllers/auth')

router.param('landId', getLandById);
router.param('userId', getUserById);

router.post('/land/add/:userId', isSignedIn, isAuthenticated, isFarmer, addLand);

router.get('/land/:landId', getLand);
router.get('/land/photo/:landId', photo);

router.put('/land/:landId/:userId', isSignedIn, isAuthenticated, isFarmer, updateLand);

router.delete('/land/:landId/:userId', isSignedIn, isAuthenticated, isFarmer, removeLand);

router.get('/lands', getAllLands);
module.exports = router;
