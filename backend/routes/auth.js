var express = require('express');
var router = express.Router();
const { check } = require('express-validator');

const { signout, signup, signin, isSignedIn, isAuthenticated, isFarmer, isCorporate, isAdmin } = require('../controllers/auth');
const {getUserById} = require('../controllers/user')

router.param('userId', getUserById)

router.post('/signup',[
    check('name', 'Name should be 5 characters').isLength({ min: 5 }),
    check('email', 'Enter valid email').isEmail(),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password should be 6 characters'),
  ],signup);

router.post('/signin',[
    check('email', 'Enter valid email').isEmail(),
    check('password').isLength({ min: 1 }).withMessage('Password field is required'),
  ],signin);

router.get('/signout', signout);

//test
router.get('/farmertest/:userId', isSignedIn, isAuthenticated, isFarmer, (req, res) =>{
  res.send('Farmer Test route');
});

router.get('/corptest/:userId', isSignedIn, isAuthenticated, isCorporate, (req, res) =>{
    res.send('Corporate Test Route');
});

router.get('/admintest/:userId', isSignedIn, isAuthenticated, isAdmin, (req, res) =>{
    res.send('Admin Test Route');
});


module.exports = router;
