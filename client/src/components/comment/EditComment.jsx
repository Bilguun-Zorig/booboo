import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../../context/UserContext'


const EditComment = ({commentId, closeEditor, onUpdateComment}) => {
    console.log("EditComment rendering with commentId:", commentId);
    const navigate = useNavigate()
    const { loggedInUser } = useContext(UserContext)
    const {id} = useParams();
    console.log("!!!!! ID AFTER EDIT COMMENT to NAVIGATE ", id)
    const [oneComment, setOneComment] = useState({
        comment: ""
    })

    useEffect(() => {
        if (!loggedInUser._id) {
            // alert("You must login to update a book")
            navigate("/login");
        }
        axios.get(`http://localhost:8000/api/comment/${commentId}`)
            .then(res => {
                console.log("Fetched comment data:", res.data);
                setOneComment(res.data)
            })
            .catch(err => console.log(err))
    }, [commentId, loggedInUser, navigate])

    const changeHandler = (e) => {
        setOneComment({
            ...oneComment,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/comment/${commentId}`, oneComment)
            .then(res => {
                console.log("UPDATE SUCCESSFUL", res.data)
                onUpdateComment(res.data)
                closeEditor();
            })
            .catch(err => console.log(err.response.data))
    }
  return (
    <div className='container d-flex justify-content-center'>
        {
                loggedInUser._id ? (
                    <form className="col-6" onSubmit={submitHandler}>
                        <h4 className="mb-3">Edit Comment</h4>
                        <div className="mb-3">
                            <textarea 
                                type="text" 
                                className="form-control" 
                                id="comment" 
                                name="comment" 
                                value={oneComment.comment} 
                                onChange={changeHandler} 
                                style={{ height: "100px", resize: "none" }} 
                                placeholder={`Comment as ${loggedInUser.firstName}`}
                            ></textarea>
                        </div>
                        <div className="mb-3 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">Edit</button>
                        </div>
                    </form>
                ) : null
            }
    </div>
    )
}

export default EditComment