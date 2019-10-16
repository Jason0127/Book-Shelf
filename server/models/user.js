const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../conifg/config').get(process.env.NODE_ENV)

const SALT_I = 10


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        
    },
    name: {
        type: String,
        maxlength: 100,
    },
    lastname: {
        type: String,
        maxlength: 100,
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})

userSchema.pre('save', function(next){
    var user = this
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var token = jwt.sign(this._id.toHexString(), config.SECRET)
    this.token = token
    this.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.methods.deleteToken = function(cb){
    this.update({$unset: {token: 1}}, function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.getReviewer = function(id, cb){
    this.findById(id, function(err, docs){
        cb(err, docs)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var users = this
    
    jwt.verify(token, config.SECRET, function(err, decode){
        if(err) throw err;
        users.findOne({"_id": decode, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}