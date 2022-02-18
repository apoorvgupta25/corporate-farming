const express = require('express')
const router = express.Router()

const {getProductById, createProduct, getProduct, getAllProducts, updateProduct, removeProduct} = require('../controllers/product')
const {getUserById} = require('../controllers/user')
const {isFarmer, isAuthenticated, isSignedIn} = require('../controllers/auth')

router.param('productId', getProductById);
router.param('userId', getUserById);

router.post('/product/create/:userId', isSignedIn, isAuthenticated, isFarmer, createProduct);

router.get('/product/:productId', getProduct);
router.get('/products', getAllProducts);

router.put('/product/:productId/:userId', isSignedIn, isAuthenticated, isFarmer, updateProduct);

router.delete('/product/:productId/:userId', isSignedIn, isAuthenticated, isFarmer, removeProduct);

module.exports = router;
