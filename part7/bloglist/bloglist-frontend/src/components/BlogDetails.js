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
                Url: <a href={blog.url}>{blog.url}</a>
                </p>
                <span className="like mr-2 lead">
                {blog.likes}
                </span>
                <button className="btn btn-success" onClick={handleLike} >Like</button>
                <div>
                <p>added by {blog.user.username}</p>
                <button className="btn btn-danger" onClick={() => handleDelete(blog)}>Remove</button>
                </div>
                <h3>comments</h3>
                <div className="form-inline mb-3">
                    <input className="form-control mr-2" value={comment} onChange={(event)=>{setComment(event.target.value)}}/>
                    <button type="button" className="btn btn-primary" onClick={addComment}>Add comment</button>
                </div>
                <ul className="list-group">
                    {blog.comments?.map((comment,i)=><li className="list-group-item"  key={i}>{comment}</li>)}
                </ul>
            </div>:null
        }
        </div>
    )}

export default BlogDetails
