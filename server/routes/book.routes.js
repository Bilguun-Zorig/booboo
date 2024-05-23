const BookController = require('../controllers/book.controller');
// const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    // GET ALL BOOKS
    app.get('/api/books', BookController.getAllBooks);

    // GET USER ALL BOOKS
    app.get('/api/books/user/:userId', BookController.getUserAllBooks);

    // GET ONE BOOK
    app.get('/api/books/:id', BookController.getOneBook);

    // CREATE A BOOK
    app.post('/api/books', BookController.createBook);

    // UPDATE A BOOK
    app.put('/api/books/:id', BookController.updateBook);

    // DELETE A BOOK
    app.delete('/api/books/:id', BookController.deleteBook);

}