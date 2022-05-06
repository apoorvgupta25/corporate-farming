var mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email:{
        type: String,
        maxlength: 32,
        trim: true,
        required: true,
        unique: true
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    state: {
        type: String
    },
    role:{
        type: Number,
        required: true
    },
    friends:{
        type : Array ,
        default : ['friendId', 'productId', 'productName','name','contact','isprod']
    },
    contact:{
        type: Number,
        maxlength: 10,
        trim: true
    },
    aadhaar:{
        type: Number,
        maxlength: 12,
        trim: true
    },
    cin:{
        type: String,
        maxlength: 21,
        trim: true
    },
    verification: {
        type: String,
        default: "Unverified",
        enum: ["Verified", "Invalid", "Unverified"]
    },
    encry_password:{
        type: String,
        required: true
    },
    salt: String,
},{timestamps: true});

// db.users.updateMany({role:1}, {$set:{"verification": "Pending"}})
// db.users.updateMany({}, {$unset: {verification:1}})

// virutals
userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.getSecuredPassword(password);
    })
    .get(function(){
        return this._password;
    })

// converting plain to secured password
userSchema.methods = {
    authenticate: function(plainPassword){
        return this.getSecuredPassword(plainPassword) === this.encry_password;
    },

    getSecuredPassword: function(plainPassword){
        if (!plainPassword)
            return "";
        try{
            const hash = crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');

            return hash;
        }
        catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema)
