const CommentController = require('../controllers/comment.controller')

module.exports = app => {

    // Get comments for a specific book
    app.get('/api/book/:id/comments', CommentController.getCommentsForBook);

    // Get one comment by id
    app.get('/api/comment/:id', CommentController.getOneComment)

    // Edit a Comment
    app.put('/api/comment/:id', CommentController.editComment);

     //Add new comment
    app.post('/api/book/:id/comments', CommentController.createComment);

    //Delete a comment
    // DELETE A BOOK
    app.delete('/api/comment/delete/:id', CommentController.deleteComment);
}