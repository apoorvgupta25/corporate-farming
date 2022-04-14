const User = require('../models/user');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req,res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    };

    const user = new User(req.body);
    user.save((err, user)=> {
        if(err){
            return res.status(400).json({
                err: "NOT able to save user in Database"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            role: user.role,
            verification: user.verification,
            id: user._id
        });
    });
};

exports.signin = (req,res) => {

    const {email, password} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    };

    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User email does not exists"
            });
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password does not match"
            });
        }

        const token = jwt.sign({ _id: user._id}, process.env.SECRET);

        res.cookie("token", token, {expire: new Date() + 9999});

        const { _id, name, role, email, verification} = user;
        return res.json({token, user: { _id, name, role, email, verification}});
    });
};

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        message: "User Signout Succesfully"
    });
};

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['sha1', 'RS256', 'HS256']
});

exports.isAuthenticated = (req,res,next) =>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

exports.isFarmer = (req,res,next) =>{
    if(req.profile.role === 1 || req.profile.role === 2){
        return res.status(403).json({
            error: "You are NOT a Farmer, ACCESS DENIED"
        });
    }
    next();
};

exports.isCorporate = (req,res,next) =>{
    if(req.profile.role === 0 || req.profile.role === 2){
        return res.status(403).json({
            error: "You are NOT a Corporate, ACCESS DENIED"
        });
    }
    next();
};

exports.isAdmin = (req,res,next) =>{
    // console.log("Admin", req.profile.role);
    if(req.profile.role === 2){
        next();
    } else{
        return res.status(403).json({
            error: "You are NOT an Admin, ACCESS DENIED"
        });
    }
};
