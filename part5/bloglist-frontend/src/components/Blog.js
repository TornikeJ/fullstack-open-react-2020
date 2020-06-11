import React, {useState} from 'react'
 
const Blog = ({ blog }) => {
  const [showList, setShowList]=useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
  <div style={blogStyle}>
    <div>
      {blog.title} {blog.author}
    <button onClick={()=>setShowList(!showList)}>{showList? 'hide':'show'}</button>
    </div>
    {
      showList ?
    <div>
      <p>
        {blog.url}  
      </p>      
      <p>
        {blog.likes} <button >Like</button>
      </p>      
    </div>:null
    }
  </div>
  )}

export default Blog
