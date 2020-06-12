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
      <input id="title" name="title" value={newTitle} onChange={handleSetNewTitle} />
    </div>
    <div>
      Author
      <input id="author" name="author" value={newAuthor} onChange={handleSetNewAuthor} />
    </div>
    <div>
      Url
      <input id="url" name="url" value={newUrl} onChange={handleSetNewUrl} />
    </div>
    <button id="createBlog" type="submit">create</button>
  </form>
)

export default BlogForm