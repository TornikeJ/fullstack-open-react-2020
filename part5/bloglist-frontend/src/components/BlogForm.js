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
    <div>
      Title
      <input name="title" value={newTitle} onChange={handleSetNewTitle} />
    </div>
    <div>
      Author
      <input name="author" value={newAuthor} onChange={handleSetNewAuthor} />
    </div>
    <div>
      Url
      <input name="url" value={newUrl} onChange={handleSetNewUrl} />
    </div>
    <button type="submit">create</button>
  </form>
)

export default BlogForm