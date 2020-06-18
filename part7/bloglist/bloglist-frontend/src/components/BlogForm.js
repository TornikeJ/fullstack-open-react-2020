import React  from 'react'

const BlogForm = ({
  handleAddBlog,
  handleSetNewTitle,
  handleSetNewAuthor,
  handleSetNewUrl,
  newTitle,
  newAuthor,
  newUrl,
}) => (
  <form onSubmit={handleAddBlog}>
    <h1>create new</h1>
    <div className="form-group">
      <label for="title" className="col-sm-1 col-form-label">Title</label> 
      <input id="title" name="title" value={newTitle} onChange={handleSetNewTitle} />
    </div>
    <div className="form-group">
      <label for="title" className="col-sm-1 col-form-label">Author</label>
      <input id="author" name="author" value={newAuthor} onChange={handleSetNewAuthor} />
    </div>
    <div className="form-group">
      <label for="title" className="col-sm-1 col-form-label">Url</label>
      <input id="url" name="url" value={newUrl} onChange={handleSetNewUrl} />
    </div>
    <button id="createBlog" type="submit" className="btn btn-primary mb-1">create</button>
  </form>
)

export default BlogForm