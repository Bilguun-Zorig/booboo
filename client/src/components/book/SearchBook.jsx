import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'

const SearchBook = () => {
    const [books, setBooks] = useState([]);
    const [searchBy, setSearchBy] = useState("")
    const [filteredBooks, setFilteredBooks] = useState([]);
    const navigate = useNavigate();

    const location = useLocation(); // To access URL query parameters
    // Function to parse query parameters
    function useQuery() {
        return new URLSearchParams(location.search);
    }
    const query = useQuery();
    const searchTerm = query.get('search'); // Get the search term from URL query parameters


    useEffect(() => {
        axios.get('http://localhost:8000/api/books')
            .then(res => {
                setBooks(res.data);
                if (searchTerm) {
                    filterBooks(searchTerm, res.data);
                }
            })
            .catch(err => console.log(err));
    }, [searchTerm]); // Depend on searchTerm to refetch when it changes

    const filterBooks = (search, booksArray) => {
        const searchLower = search.toLowerCase();
        // This object is used to keep track of how many books match the search term based on each attribute
        let count = { title: 0, author: 0, genre: 0 };

        const filtered = booksArray.filter(book => {
            const matchesTitle = book.title.toLowerCase().includes(searchLower);
            const matchesAuthor = book.author.toLowerCase().includes(searchLower);
            const matchesGenre = book.genre.toLowerCase().includes(searchLower);

            if (matchesTitle) count.title++;
            if (matchesAuthor) count.author++;
            if (matchesGenre) count.genre++;

            return matchesTitle || matchesAuthor || matchesGenre;
        });

        // Determine the most relevant search type based on counts
        const maxCount = Math.max(count.title, count.author, count.genre);
        if (maxCount === count.title) setSearchBy('By Title');
        else if (maxCount === count.author) setSearchBy('By Author');
        else if (maxCount === count.genre) setSearchBy('By Genre');

        setFilteredBooks(filtered);
    };


    const clickHandler = (e) => {
        navigate(`/books/${e.target.value}`)
    };
    return (
        <div className='container'>
            {
                searchBy && <h1>{searchBy} : {filteredBooks.length}</h1>
            }
            {
                filteredBooks.length === 0 ? <h1>404 Not Found</h1> :

                    <div className="row row-cols-md-4 g-4 m-5">
                        {filteredBooks.map(book => (
                            <div key={book._id} className="col">
                                <div className="card h-100">
                                    <img src={book.coverImageUrl} className="card-img-top mx-auto my-auto p-3" alt={book.title} style={{ width: "200px", height: "100%" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">Author: {book.author}</p>
                                        <p className="card-text">Pages: {book.pages}</p>
                                        <p className="card-text">Publish Year: {book.publishYear}</p>
                                        <p className="card-text">Genre: {book.genre}</p>
                                        <button onClick={clickHandler} value={book._id} className="btn btn-primary float-end">View Book</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </div>
    )
}

export default SearchBook