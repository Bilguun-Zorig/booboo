const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user_comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }
    
},
    {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;