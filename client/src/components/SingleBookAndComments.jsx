import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import DisplayOneBook from './book/DisplayOneBook'
import CommentForm from './comment/CommentForm'
import DisplayAllComments from './comment/DisplayAllComments'
import EditComment from './comment/EditComment'

const SingleBookAndComments = () => {
    const [comments, setComments] = useState([]);
    const { id } = useParams(); 
    const [editCommentId, setEditCommentId] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/book/${id}/comments`)
            .then(res => {
                setComments(res.data);
            })
            .catch(err => console.log(err));
    }, [id]); 


    const addComment = newComment => {
        console.log("!!!!! NEW COMMENT FROM SNGLEBOOKANDCOMMENTS ", newComment)
        setComments(prevComments => [...prevComments, newComment]);
    };

    const handleEditComment = commentId => {
        setEditCommentId(commentId) // set the id of comment to be edited
        console.log("Setting Edit Comment ID to:", commentId);  
    };

    const updateComment = updatedComment => {
        console.log("Updating comment:", updatedComment);
        setComments(prevComments => prevComments.map(comment => 
            comment._id === updatedComment._id ? updatedComment : comment
        ));
    }

    const deleteComment = commentId => {
        axios.delete(`http://localhost:8000/api/comment/delete/${commentId}`)
        .then(res => {
            setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
        })
        .catch(err => console.log(err))
    }

    const closeEditor = () => {
        setEditCommentId(null);  // Reset the state to close the editor
    };
    return (
        <div className='container'>
            <div>
                <DisplayOneBook/>
                {!editCommentId && <CommentForm  isCompact={true} addComment ={addComment}/>}
                {editCommentId && <EditComment commentId={editCommentId} closeEditor={closeEditor} onUpdateComment = {updateComment}/>}
                <DisplayAllComments isCompact={true} comments ={comments} onEditComment={handleEditComment} onDeleteComment={deleteComment}/>
                
            </div>
        </div>
    )
}

export default SingleBookAndComments