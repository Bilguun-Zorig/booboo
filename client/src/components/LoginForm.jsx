import { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../context/UserContext'
import BooBooLogo from '../images/BooBooLogo.png';

const LoginForm = ({ isCompact = false }) => {
    const { saveLoggedInUser } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    });
    const [errorMessages, setErrorMessages] = useState("")
    const formClass = isCompact ? "col-4 m-3" : null;


    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    };

    const submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', userInfo, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                //save the new registered user in state and then redirect!
                saveLoggedInUser(res.data.user)
                navigate('/');
            })
            .catch(err => {
                console.log(err)
                setErrorMessages(err.response.data.message)
            });
    }

    return (
        <div className={`d-flex justify-content-evenly ${formClass}`} >
            {
                location.pathname !== '/reg/log' && (
                    <div>
                        <img src={BooBooLogo} alt="BooBoo Logo" />
                    </div>
                )
            }
            <div style={{ width: location.pathname == '/reg/log' ? "350px" : "350px", marginTop: location.pathname !== '/reg/log' ? "20px" : "0" }}>
                < h1 > Login</h1 >
                <form onSubmit={submitHandler}>
                    <div className="form-group pb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} value={userInfo.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} value={userInfo.password} />
                    </div>
                    <div className={`mt-3 ${errorMessages ? "d-flex justify-content-between" : "float-end"}`}>
                        {errorMessages && <p className='text-danger'>{errorMessages}</p>}
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div >


    )
}

export default LoginForm