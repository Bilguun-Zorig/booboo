import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const MyBooks = () => {
    const { loggedInUser } = useContext(UserContext)
    console.log("Logged IN USER from DISPLAY ONE BOOK: ", loggedInUser)
    const [books, setBooks] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser && loggedInUser._id) {
            axios.get(`http://localhost:8000/api/books/user/${loggedInUser._id}`)
                .then(res => {
                    console.log(res.data);
                    setBooks(res.data)
                })
                .catch(err => console.log(err))
        } else {
            navigate('/login')
        }
    }, [loggedInUser, navigate]);

    const clickHandler = (e) => {
        navigate(`/books/${e.target.value}`)
    }

  return (
    <div className='container'>
            <div className="row">
                {loggedInUser && loggedInUser._id ? < h1 className='text-primary'>{loggedInUser.firstName}' Books</h1> : null}
                <div className="row row-cols-md-4 g-4">
                    {books.map((book, i) => (
                        <div key={book._id} className="col">
                            <div className="card h-100">
                                <img src={book.coverImageUrl} className="card-img-top mx-auto my-auto p-3" alt={book.title} style={{ width: "200px", height: "100%" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">Author: {book.author}</p>
                                    <p className="card-text">Pages: {book.pages}</p>
                                    <p className="card-text">Publish Year: {book.publishYear}</p>
                                    <p className="card-text">Genre: {book.genre}</p>
                                    <button onClick={clickHandler} value={book._id} className="btn btn-primary float-end">See Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
  )
}

export default MyBooks