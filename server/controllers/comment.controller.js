const Comment = require('../models/comment.model');
const Book = require('../models/book.model')


module.exports = {
    //Add new comment
    createComment: (req, res) => {
        const { id } = req.params;
        const commentData = { ...req.body, book: id };

        Comment.create(commentData)
            .then(newComment => {
                // Populate user details immediately after creating the comment
                Comment.findById(newComment._id)
                    .populate('user_comment', 'firstName lastName')
                    .then(populatedComment => {
                        Book.findByIdAndUpdate(id, { $push: { comments: populatedComment._id } }, { new: true })
                            .then(() => {
                                res.json(populatedComment); // Send the populated comment back
                            })
                            .catch(err => res.status(500).json(err));
                    })
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    },
    //Get All comments
    getCommentsForBook: (req, res) => {
        const { id } = req.params;
        Comment.find({ book: id })
            .populate('user_comment', 'firstName lastName')
            .then(comments => res.json(comments))
            .catch(err => res.status(500).json(err));
    },

    //Edit Comment
    editComment: (req, res) => {
        const id = req.params.id;
        Comment.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true })
            .populate('user_comment', 'firstName lastName')
            .then((editComment) => {
                console.log(editComment);
                res.json(editComment);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },
    
    //Get One Comment by id
    getOneComment: (req, res) => {
        Comment.findById(req.params.id)
        .then((oneComment) => {
            console.log(oneComment);
            res.json(oneComment);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    },

    //Delete a comment
    deleteComment: (req, res) => {
        const id = req.params.id;
        Comment.deleteOne({ _id: id })
            .then((deletedComment) => {
                console.log(deletedComment);
                res.json(deletedComment);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    }




};