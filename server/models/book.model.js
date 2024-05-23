const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters long"]
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        minlength: [3, "Author must be at least 3 characters long"]
    },
    isbn_number: {
        type: String,
        required: [true, "ISBN is required"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        max: [5, "Maximum value is 5"],
        min: [0, "Value must greater be than 0"]
    },
    pages: {
        type: Number,
        required: [true, "Pages is required"],
        min: [10, "Pages must be at least 10 page long"]
    },
    publishYear: {
        type: Number,
        required: [true, "Publish Year is required"],
        min: [1800, "Publish Year must be at least 1800"]
    },
    genre: {
        type: String,
        required: [true, "Genre is required"]
    },
    aboutBook: {
        type: String
    },
    // Reference to the User who created the book
    //stores the ID of the user who created it.
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coverImageUrl: {
        type: String,
        required: [true, "Cover image URL is required"]
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
    { timestamps: true });

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;
