import { useState, useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DisplayAllBooks from './components/DisplayAllBooks'
import BookForm from './components/BookForm'
import DisplayOneBook from './components/DisplayOneBook'
import EditBook from './components/EditBook'
import RegisterForm from './components/RegisterForm'
import NotFound from './components/NotFound'
import LoginForm from './components/LoginForm'
import RegLog from './components/RegLog'
import UserContext from './context/UserContext'
import SearchBook from './components/SearchBook'
// import { UserProvider } from './context/UserContext';
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
            <Route path='/books/:id' element={<DisplayOneBook />} />
            <Route path='/books/edit/:id' element={<EditBook />} />
            <Route path='/login' element={<LoginForm />} />
            {/* <Route path='/register' element={<RegisterForm />} /> */}
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
