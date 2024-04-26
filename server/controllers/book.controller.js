const Book = require('../models/book.model');

module.exports = {

    // GET ALL BOOKS
    getAllBooks: (req, res) => {
        Book.find()
            .then((allBooks) => {
                console.log(allBooks);
                res.json(allBooks);
            }
            )
            .catch((err) => {
                res.status(500).json(err);
            }
            )
    },

    // GET ONE BOOK
    getOneBook: (req, res) => {
        Book.findById(req.params.id)
            .then((oneBook) => {
                console.log(oneBook);
                res.json(oneBook);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },

    // CREATE ONE BOOK
    createBook: (req, res) => {
        Book.create(req.body)
            .then((newBook) => {
                console.log(newBook);
                res.json(newBook);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },
    // createBook: (req, res) => {
    //     // Check if user is authenticated
    //     if (!req.user || !req.user._id) {
    //         return res.status(401).json({ message: "Unauthorized from API" });
    //     }

    //     // User is authenticated, proceed with creating the book
    //     Book.create({ ...req.body, creator: req.user._id }) // Add the creator field to the book
    //         .then((newBook) => {
    //             console.log(newBook);
    //             res.json(newBook);
    //         })
    //         .catch((err) => {
    //             res.status(500).json(err);
    //         })
    // },

    // UPDATE ONE BOOK
    updateBook: (req, res) => {
        const id = req.params.id;
        Book.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true, runValidators: true })
            .then((updatedBook) => {
                console.log(updatedBook);
                res.json(updatedBook);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    },

    // DELETE ONE BOOK
    deleteBook: (req, res) => {
        const id = req.params.id;
        Book.deleteOne({ _id: id })
            .then((deletedBook) => {
                console.log(deletedBook);
                res.json(deletedBook);
            })
            .catch((err) => {
                res.status(500).json(err);
            })
    }
}