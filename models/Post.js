const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        trim: true,
    },
    description:{
        type: String,
        trim:true,
    },
    image: [{
        type: String,
        required: false,
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
},{timestamps: true});
//Create the index for the postSchema
postSchema.index({
    likes: -1, // Sort by number of likes in descending order
    createdAt: -1 // Sort by timestamp in descending order
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;




