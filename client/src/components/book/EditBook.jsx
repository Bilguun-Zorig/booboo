import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'


const EditBook = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const { loggedInUser } = useContext(UserContext)
    console.log("Logged in user id from Edit Book Comp:", id)
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
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!loggedInUser._id) {
            navigate("/login");
        }
        axios.get(`http://localhost:8000/api/books/${id}`)
            .then(res => {
                setBook(res.data)
            })
            .catch(err => console.log(err))
    }, [id, loggedInUser])

    const changeHandler = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/books/${id}`, book)
            .then(res => {
                if (res.data.errors) {
                    console.log("In Error Message")
                    setErrors(err.response.data.errors)
                } else {
                    navigate("/")
                }
            })
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div className='container m-5'>
            {loggedInUser && loggedInUser._id ? < h1 >{loggedInUser.firstName}'s book</h1> : null}
            <form className="col-md-4 offset-4" onSubmit={submitHandler}>
                <h1 className="mb-3 text-primary">Update a Book</h1>
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
                    {errors.author ? <p className="text-danger">{errors.author.message}</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="pages" className="form-label">Pages</label>
                    <input type="number" className="form-control" id="pages" name="pages" value={book.pages} onChange={changeHandler} />
                    {errors.pages ? <p className="text-danger">{errors.pages.message}</p> : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input type="number" className="form-control" id="rating" name="rating" value={book.rating} onChange={changeHandler} />
                    {errors.pages ? <p className="text-danger">{errors.pages.message}</p> : null}
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
                    <textarea type="text" className="form-control" id="aboutBook" name="aboutBook" value={book.aboutBook} onChange={changeHandler} style={{ height: "100px" }}></textarea>
                    {/* {errors.genre ? <p className="text-danger">{errors.aboutBook.message}</p> : null} */}
                </div>
                <div className="mb-3">
                    <label htmlFor="coverImageUrl" className="form-label">Cover Image URL</label>
                    <input type="text-area" className="form-control" id="coverImageUrl" name="coverImageUrl" value={book.coverImageUrl} onChange={changeHandler} />
                    {errors.coverImageUrl ? <p className="text-danger">{errors.coverImageUrl.message}</p> : null}
                </div>
                <div className="mb-3 d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div >
    )
}

export default EditBook