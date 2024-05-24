import React, { useContext } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import UserContext from '../../context/UserContext'


const DisplayAllComments = ({ comments, onEditComment, onDeleteComment }) => {
    const { loggedInUser } = useContext(UserContext)
    console.log("Logged IN USER from DISPLAY ALL COMMENTS: ", loggedInUser)

    const formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });
    console.log("COMMENTS FROM DISPLAY ALL COMMENTS ", comments)

    const deleteHandler = commentId => {
        onDeleteComment(commentId)
    }
    
    

return (
    <div className='container'>
        {comments.length > 0 && <h4 className='mb-3'>Comments</h4>}
            {
                comments.map((comment) =>(
                    <div key={comment._id} className='row d-flex justify-content-center'>
                        <div className="col-8 mb-3">
                            <div className='d-flex'>
                                <div className='col-8'>
                                    <p>{comment.comment}</p>
                                </div>
                                <div className='col-4 d-flex justify-content-end'>
                                    <p>
                                        {comment.user_comment ? `${comment.user_comment.firstName} ${comment.user_comment.lastName}` : ""}
                                    </p>
                                    <p className='ms-4'>{formatter.format(new Date(comment.createdAt))}</p>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                    {
                                        loggedInUser._id === comment.user_comment._id ? (
                                            <div>
                                                <button onClick={() => onEditComment(comment._id)} className="btn btn-primary">Edit</button>
                                                <button onClick={() => deleteHandler(comment._id)} value={comment._id} className="btn btn-danger ms-4">Delete</button>
                                            </div>
                                        ) : null
                                    }
                            </div>
                        </div>
                    </div>
                ))
            }

    </div>
    )
}

export default DisplayAllComments