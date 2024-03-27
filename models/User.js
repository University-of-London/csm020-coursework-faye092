const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3, //minimum length of username is 3
        maxlength: 20, //maximum length of username is 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 6, //minimum length of email is 6
        maxlength: 50, //maximum length of email is 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6, //minimum length of password is 6
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    coverPicture: {
        type: String,
        default: '',
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    blockList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
},{timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;