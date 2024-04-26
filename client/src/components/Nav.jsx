import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'

const Nav = ({ handleLogout, setSearchTerm }) => {
    const { loggedInUser } = useContext(UserContext)
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate()
    console.log("Logged IN USER from NAV: ", loggedInUser)

    const handleLogoutClick = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
            .then(res => {
                console.log(res);
                localStorage.removeItem('loggedInUser');
                handleLogout()
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput);  // Set global search term
        navigate(`/books/search?search=${encodeURIComponent(searchInput)}`); // Update the URL with the search term
        setSearchInput("");
    };

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    return (
        <nav className='d-flex justify-content-between align-items-center'>
            <Link to='/' className="nav-link active"><h1>BooBoo</h1></Link>
            {/* search book */}
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-3"
                    type="search"
                    placeholder="Search by title, author or genre"
                    aria-label="Search"
                    value={searchInput}
                    onChange={handleChange}
                    style={{ width: "350px" }}
                />
                <button className="btn btn-outline-success" type="submit" style={{ width: "150px" }}>Search</button>
            </form>
            <div className="d-flex justify-content-around w-30" >
                <nav className="navbar navbar-expand-lg ">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/books/create" className="nav-link">Create a Book</Link>
                            </li>

                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type='button' data-bs-toggle='dropdown'>
                                    Menu
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        {
                                            loggedInUser && loggedInUser._id ? null : (
                                                <Link to='/login' className="dropdown-item">Login</Link>
                                            )
                                        }

                                    </li>
                                    <li>
                                        <Link to="/reg/log" className="dropdown-item">Create Account</Link>
                                    </li>
                                    <li>
                                        {
                                            loggedInUser && loggedInUser._id ? (
                                                <button onClick={handleLogoutClick} className="dropdown-item">Logout</button>
                                            ) : null
                                        }
                                    </li>
                                </ul>
                            </div>
                        </ul>

                    </div>
                </nav>

            </div>
        </nav>
    )
}

export default Nav

