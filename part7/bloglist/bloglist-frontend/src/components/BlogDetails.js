import React, {useState} from 'react'
import blogService from '../services/blogs'
import { updateBlogAction } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import {
  useParams
} from "react-router-dom"

const BlogDetails = ({ handleDelete, blogs }) => {
    const id = useParams().id
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const blog = blogs.find(x => x.id === id)

    const handleLike = () => {
        blog.likes+=1;
        dispatch(updateBlogAction(blog))
        blogService.update(blog.id,blog)
    }

    const addComment = () => {
        blogService.addComment({id, comment})
        .then(({comment}) => {
            blog.comments=[...blog.comments,comment];
            dispatch(updateBlogAction(blog))
        })
        setComment('')
    }

    return(
        <div className="blog" >
        <div>
            <h1>{blog?.title} {blog?.author}</h1>
        </div>
        {
            blog ?
            <div>
                <p>
                {blog.url}
                </p>
                <span className="like">
                {blog.likes}
                </span>
                <button onClick={handleLike} >Like</button>
                <div>
                <p>added by {blog.user.username}</p>
                <button onClick={() => handleDelete(blog)}>Remove</button>
                </div>
                <h3>comments</h3>
                <div>
                    <input value={comment} onChange={(event)=>{setComment(event.target.value)}}/>
                    <button type="button" onClick={addComment}>Add comment</button>
                </div>
                <ul>
                    {blog.comments?.map((comment,i)=><li key={i}>{comment}</li>)}
                </ul>
            </div>:null
        }
        </div>
    )}

export default BlogDetails
