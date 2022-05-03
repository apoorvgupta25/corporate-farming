const express = require('express')
const router = express.Router()

const {getContractById ,addContract, getContract, getAllContracts, updateContract, removeContract} = require('../controllers/contract')
const {getUserById} = require('../controllers/user')
const {isSignedIn, isCorporate} = require('../controllers/auth')

router.param('userId', getUserById);
router.param('contractId', getContractById);

router.post('/contract/create/:userId', isSignedIn, isCorporate, addContract);

router.get('/contract/:contractId', getContract);
router.get('/contracts', getAllContracts);

router.put('/contract/:contractId/:userId', isSignedIn, updateContract);

router.delete('/contract/:contractId/:conId', isSignedIn, removeContract);

module.exports = router;
