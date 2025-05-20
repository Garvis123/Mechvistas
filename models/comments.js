const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  blogId: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;