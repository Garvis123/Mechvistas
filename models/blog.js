const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    createdAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    views: {
        type:Number,
        default:0
    }, // public or private
    coverImage:{
        type:Object,
        required:true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }]
});

module.exports = mongoose.model('Blog', blogSchema);
