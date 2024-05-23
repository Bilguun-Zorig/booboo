import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'


const BookForm = () => {
    const { loggedInUser } = useContext(UserContext)
    console.log("USER FROM BOOKFROM", loggedInUser)
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: "",
        author: "",
        isbn_number: "",
        rating: "",
        pages: "",
        publishYear: "",
        genre: "",
        aboutBook: "",
        coverImageUrl: ""
    });
    const [errors, setErrors] = useState({
        title: "",
        author: "",
        isbn_number: "",
        rating: "",
        pages: "",
        publishYear: "",
        genre: "",
        aboutBook: "",
        coverImageUrl: ""
    })

    const changeHandler = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        // Check if the user is authenticated
        if (loggedInUser && loggedInUser._id) {
            // Get the user ID from the loggedInUser context
            const userId = loggedInUser._id;
            console.log("USER ID FROM BOOKFORM", userId)
            // Create the book object with the creator field set to the user ID
            const bookData = {
                ...book,
                coverImageUrl: book.coverImageUrl,
                creator: userId
            };
            axios.post('http://localhost:8000/api/books', bookData, { withCredentials: true })
                .then(res => {
                    console.log(res.data)
                    //! pass down book creator to other child components!!!
                    console.log("NEW BOOK CREATOR*****", res.data.creator)
                    // clear out the form after submit
                    setBook({
                        title: "",
                        author: "",
                        isbn_number: "",
                        rating: "",
                        pages: "",
                        publishYear: "",
                        genre: "",
                        aboutBook: "",
                        coverImageUrl: ""
                    })
                    console.log("NEW BOOK*****", book)
                    navigate('/')
                })
                .catch(err => {
                    console.log(err.response.data.errors)
                    // grab error message from the object returned and setErrors
                    setErrors(err.response.data.errors)
                    console.log(errors)
                })
        } else {
            navigate('/login')
        }
    }

    return (
        <div className='container'>
            <div className="row">
            {loggedInUser && loggedInUser._id ? < h1 >{loggedInUser.firstName}'s book</h1> : null}
            <form className="col-md-4 offset-4" onSubmit={submitHandler}>
                <h1 className="mb-3 text-primary">Add a Book</h1>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={book.title} onChange={changeHandler} />
                    {errors.title ? <p className="text-danger ">{errors.title.message}</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input type="text" className="form-control" id="author" name="author" value={book.author} onChange={changeHandler} />
                    {errors.author ? <p className="text-danger">{errors.author.message}</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="isbn_number" className="form-label">ISBN</label>
                    <input type="text" className="form-control" id="isbn_number" name="isbn_number" value={book.isbn_number} onChange={changeHandler} />
                    {errors.isbn_number ? <p className="text-danger">{errors.isbn_number.message}</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="pages" className="form-label">Pages</label>
                    <input type="number" className="form-control" id="pages" name="pages" value={book.pages} onChange={changeHandler} />
                    {errors.pages ? <p className="text-danger">{errors.pages.message}</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input type="number" className="form-control" id="rating" name="rating" value={book.rating} onChange={changeHandler} />
                    {errors.rating ? <p className="text-danger">{errors.rating.message}</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="publishYear" className="form-label">Publish Year</label>
                    <input type="number" className="form-control" id="publishYear" name="publishYear" value={book.publishYear} onChange={changeHandler} />
                    {errors.publishYear ? <p className="text-danger">{errors.publishYear.message}</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="genre" className="form-label">Genre</label>
                    <input type="text" className="form-control" id="genre" name="genre" value={book.genre} onChange={changeHandler} />
                    {errors.genre ? <p className="text-danger">{errors.genre.message}</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="aboutBook" className="form-label">About the book</label>
                    <textarea type="text" className="form-control" id="aboutBook" name="aboutBook" value={book.aboutBook} onChange={changeHandler} style={{ height: "100px", resize: "none" }}></textarea>
                    {/* {errors.aboutBook ? <p className="text-danger">{errors.aboutBook.message}</p> : null} */}
                </div>

                <div className="mb-3">
                    <label htmlFor="coverImageUrl" className="form-label">Cover Image URL</label>
                    <input type="text" className="form-control" id="coverImageUrl" name="coverImageUrl" value={book.coverImageUrl} onChange={changeHandler} />
                    {errors.coverImageUrl ? <p className="text-danger">{errors.coverImageUrl.message}</p> : null}
                </div>
                <div className="mb-3 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default BookForm