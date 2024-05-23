import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'


const DisplayOneBook = () => {
    const { loggedInUser } = useContext(UserContext)
    console.log("Logged IN USER from DISPLAY ONE BOOK: ", loggedInUser)
    const { id } = useParams()
    const navigate = useNavigate()

    const [book, setBook] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}`)
            .then(res => {
                console.log("****A Book from Display One Component: ", res.data)
                setBook(res.data)
                console.log("****A Book Creator ID from Display One Component: ", book.creator)
            })
            .catch(err => console.log(err))
    }, [])

    const editHandler = (e) => {
        navigate(`/books/edit/${e.target.value}`)
    }

    const deleteHandler = (e) => {
        axios.delete(`http://localhost:8000/api/books/${e.target.value}`)
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='container col-md-6 offset-3'>
            <h1 className='text-primary'>{book.title}</h1>
            <div className='d-flex pb-4'>
                <div>
                    <img src={book.coverImageUrl} className="card-img-top mx-auto my-auto" alt={book.title} style={{ width: "200px" }} />
                    <p className='mt-3'><strong>Author:</strong> {book.author}</p>
                    <p className='mt-3'><strong>ISBN Number:</strong> {book.isbn_number}</p>
                    <p className='mt-3'><strong>Rating:</strong> {book.rating}</p>
                    <p className='mt-3'><strong>Pages:</strong> {book.pages}</p>
                    <p className='mt-3'><strong>Publish Year:</strong> {book.publishYear}</p>
                    <p className='mt-3'><strong>Genre:</strong> {book.genre}</p>
                    {
                        loggedInUser._id === book.creator ? <p className='mt-3'><strong>Book Added By:</strong> {loggedInUser.firstName} {loggedInUser.lastName}</p> : null
                    }
                </div>
                <p className='ps-5 lh-lg'><strong style={{ textTransform: "uppercase" }} id='paragraph'>{book.title}</strong> {book.aboutBook}
                </p>
            </div>
            {
                loggedInUser._id === book.creator ? (
                    <div className='float-end'>
                        <button onClick={editHandler} value={book._id} className="btn btn-primary">Edit Book</button>
                        <button onClick={deleteHandler} value={book._id} className="btn btn-danger ms-4">Delete Book</button>
                    </div>
                ) : null
            }
        </div>
    )
}

export default DisplayOneBook