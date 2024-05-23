import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../context/UserContext'

const RegisterForm = () => {

    const { saveLoggedInUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const [errorMessages, setErrorMessages] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    };

    const submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', userInfo, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                //save the new registered user in state and then redirect!
                saveLoggedInUser(res.data.user)
                navigate('/');
            })
            .catch(err => {
                let errorsFromBackEnd = err.response.data.errors;
                console.log(errorsFromBackEnd)
                let newErrorObj = { ...errorMessages }
                for (let fieldName in errorMessages) {
                    if (errorsFromBackEnd.hasOwnProperty(fieldName)) {
                        newErrorObj[fieldName] = errorsFromBackEnd[fieldName].message;
                    } else {
                        newErrorObj[fieldName] = ""; //clear the error
                    }
                }
                setErrorMessages(newErrorObj)
                console.log("ERROR Object MSG: ", newErrorObj)
                console.log("ERROR MSG: ", errorMessages)
            });
    }
    return (
        <div className="container col-4 m-3">
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <div className={`form-group ${errorMessages.firstName ? '' : 'pb-3'}`}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" className="form-control" onChange={handleChange} />
                    {errorMessages.firstName ? <p className='text-danger'>{errorMessages.firstName}</p> : null}
                </div>
                <div className={`form-group ${errorMessages.firstName ? '' : 'pb-3'}`}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" className="form-control" onChange={handleChange} />
                    {errorMessages.lastName ? <p className='text-danger'>{errorMessages.lastName}</p> : null}
                </div>
                <div className={`form-group ${errorMessages.firstName ? '' : 'pb-3'}`}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} />
                    {errorMessages.email ? <p className='text-danger'>{errorMessages.email}</p> : null}
                </div>
                <div className={`form-group ${errorMessages.firstName ? '' : 'pb-3'}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} />
                    {errorMessages.password ? <p className='text-danger'>{errorMessages.password}</p> : null}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} />
                    {errorMessages.confirmPassword ? <p className='text-danger'>{errorMessages.confirmPassword}</p> : null}
                </div>
                <div className="mt-3 d-flex justify-content-end">
                    <button className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm