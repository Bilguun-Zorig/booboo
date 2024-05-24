import { useState, useEffect } from 'react'
import './App.css'
import Nav from './components/book/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DisplayAllBooks from './components/book/DisplayAllBooks'
import BookForm from './components/book/BookForm'
import EditBook from './components/book/EditBook'
import NotFound from './components/NotFound'
import LoginForm from './components/user/LoginForm'
import RegLog from './components/user/RegLog'
import UserContext from './context/UserContext'
import SearchBook from './components/book/SearchBook'
import MyBooks from './components/book/MyBooks'
import SingleBookAndComments from './components/SingleBookAndComments'

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const saveLoggedInUser = userData => {
    const userObj = { ...userData, password: "" }; //clear password after registering/logging in
    setLoggedInUser(userObj);
    localStorage.setItem("loggedInUser", JSON.stringify(userObj));
  }


  return (
    <>
      <UserContext.Provider value={{ loggedInUser, saveLoggedInUser }}>
        <BrowserRouter>
          <Nav handleLogout={() => setLoggedInUser({})} setSearchTerm={setSearchTerm} />
          <Routes>
            <Route path='/' element={<DisplayAllBooks />} />
            <Route path='/books/create' element={<BookForm setLoggedInUser={setLoggedInUser} />} />
            <Route path='/books/my' element={<MyBooks/>} />
            <Route path='/books/:id' element={<SingleBookAndComments />} />
            <Route path='/books/edit/:id' element={<EditBook />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/reg/log' element={<RegLog />} />
            <Route path='/books/search' element={<SearchBook searchTerm={searchTerm} />} />
            {/* catch out at the end of all route */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  )
}

export default App
