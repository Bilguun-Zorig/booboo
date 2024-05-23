import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../../context/UserContext'

const CommentForm = ({addComment}) =>{
    const { loggedInUser } = useContext(UserContext);
    console.log("USER FROM BOOKFROM", loggedInUser);
    const {id} = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState({
        comment: ""
    });

    const changeHandler = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }


    const submitHandler = (e) => {
        e.preventDefault()
        // Check if the user is authenticated
        if (loggedInUser && loggedInUser._id) {
            // Get the user ID from the loggedInUser context
            const userId = loggedInUser._id;
            console.log("USER ID FROM COMMENT FORM", userId)
            const commentData = { comment: comment.comment, user_comment: loggedInUser._id, book: id };

            axios.post(`http://localhost:8000/api/book/${id}/comments`, commentData, { withCredentials: true })
                .then(res => {
                    console.log(res.data)
                    console.log("******NEW COMMENT*****", res.data.comments)
                    addComment(res.data)
                    setComment({
                        comment: ""
                    })
                    console.log("*****NEW COMMENT*****", comment)

                })
                .catch(err => {
                    console.log(err.response.data.errors)
                })
        } else {
            navigate('/login')
        }
    }

    return (
        <div className='container d-flex justify-content-center'>
                {
                    loggedInUser._id ? (
                        <form className="col-6" onSubmit={submitHandler}>
                            <h1 className="mb-3 text-primary">New Comment</h1>
                            <div className="mb-3">
                                <textarea 
                                    type="text" 
                                    className="form-control" 
                                    id="comment" 
                                    name="comment" 
                                    value={comment.comment} 
                                    onChange={changeHandler} 
                                    style={{ height: "100px", resize: "none"}} 
                                    placeholder={`Comment as ${loggedInUser.firstName}`}
                                ></textarea>
                            </div>
                            <div className="mb-3 d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                        </form>
                    ) : null
                }

        </div>
    )
}

export default CommentForm