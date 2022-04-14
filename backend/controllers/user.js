const User = require('../models/user');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user found in DB"
            })
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile)
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if(err || !users){
            return res.status(400).json({
                error: "No user found in DB"
            })
        }
        res.json(users)
    })
};

//get friends
exports.getFriends = async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.friends.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, name} = friend;
        friendList.push({ _id, name });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
}

  //follow a user

  exports.followUser = async (req, res) => {

    if (req.params.currentUserId !== req.params.userId) {
      try {
        const user = await User.findById(req.params.userId);
        const currentUser = await User.findById(req.params.currentUserId);
        if (!user.friends.includes(req.params.currentUserId)) {
          await user.updateOne({ $push: { friends: req.params.currentUserId } });
          await currentUser.updateOne({ $push: { friends: req.params.userId } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you can't follow yourself");
    }
  }

  //unfollow a user

  exports.UnfollowUser = async (req, res) => {
    if (req.params.currentUserId !== req.params.userId) {
      try {
        const user = await User.findById(req.params.userId);
        const currentUser = await User.findById(req.params.currentUserId);
        if (user.friends.includes(req.params.currentUserId)) {
          await user.updateOne({ $pull: { friends: req.params.currentUserId } });
          await currentUser.updateOne({ $pull: { friends: req.params.userId } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you don't follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you can't unfollow yourself");
    }
  }

// Unverified Users
exports.getAllUnverifiedFarmers = (req, res) => {
    User.find({role: 0, verification: "Unverified"}).exec((err, users) => {
        if(err || !users){
            return res.status(400).json({
                error: "No user found in DB"
            })
        }
        res.json(users)
    })
};

// Verified Users
exports.getAllVerifiedFarmers = (req, res) => {
    User.find({role: 0, verification: "Verified"}).exec((err, users) => {
        if(err || !users){
            return res.status(400).json({
                error: "No user found in DB"
            })
        }
        res.json(users)
    })
};

// Invalid Users
exports.getAllInvalidFarmers = (req, res) => {
    User.find({role: 0, verification: "Invalid"}).exec((err, users) => {
        if(err || !users){
            return res.status(400).json({
                error: "No user found in DB"
            })
        }
        res.json(users)
    })
};

exports.getVerificationEnums = (req, res) => {
    res.json(User.schema.path("verification").enumValues);
}

exports.updateVerification = (req, res) => {
    User.updateOne(
        {_id: req.body.farmerId},
        {$set: {verification: req.body.verification}},
        (err, updatedFarmer) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            res.json(updatedFarmer);
        }
    )
}
