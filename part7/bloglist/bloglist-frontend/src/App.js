import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import Users from './components/Users'
import Navigation from './components/Navigation'
import User from './components/User'
import { initBlogs, addBlogAction, removeBlogAction } from './reducers/blogReducer'
import { storeUserAction } from './reducers/userReducer'
import { addSuccessNotification, addFailNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/users'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"

const App = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const blogFormRef = React.createRef()

  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [users, setUsers]=useState([]);

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs))
    blogService.getAll().then((blogs) => dispatch(initBlogs(blogs)))
  }, [])

  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
     
      dispatch(storeUserAction(user))
      blogService.setToken(user.token)
    }
  }, [])
  
  useEffect(() => {
    console.log(user,'lala')
    userService.getAll().then((users) => setUsers(users))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(storeUserAction(user))
      // setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(addFailNotification('Wrong credentials'))
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      likes: 0,
      url: newUrl,
    }

    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      // setBlogs(blogs.concat(returnedBlog))
      dispatch(addBlogAction(returnedBlog))
      console.log(returnedBlog)
      dispatch(addSuccessNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`))
      setNewUrl('')
      setNewTitle('')
      setNewAuthor('')
    })
  }

  const loginForm = () => {
    return (
      <>
      <Notification/>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
      </>
    )
  }

  const handleLogOut = () => {
    dispatch(storeUserAction(null))
    window.localStorage.removeItem('loggedNoteappUser')
  }

  const removeBlog = (blog) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}?`
      )
    ) {
      blogService.remove(blog.id).then(
        dispatch(removeBlogAction(blog))
        // setBlogs(blogs.filter((blogDb) => blogDb.id !== blog.id))
      ).catch(err=> {
        dispatch(initBlogs(blogs))
        dispatch(addFailNotification("This blog wasn't created by logged user and can't delete it"))
      })
    }
  }

  const blogForm = () => (
    <BlogForm
      newTitle={newTitle}
      newAuthor={newAuthor}
      newUrl={newUrl}
      handleAddBlog={addBlog}
      handleSetNewTitle={({ target }) => setNewTitle(target.value)}
      handleSetNewAuthor={({ target }) => setNewAuthor(target.value)}
      handleSetNewUrl={({ target }) => setNewUrl(target.value)}
    />
  )

  return (
    <div>

      {user === null ? (
        loginForm()
        ) : (
          <div>
            <Router>
            <div style={{display:'flex', background:'lightgray', padding:'0.5rem 0'}}>
              <Navigation />
              <span>{user.name} logged in</span>{' '}
              <button onClick={handleLogOut}>logout</button>
            </div>
              <h2>Blogs</h2>
              <Notification/>
              <Switch>
                <Route path="/users/:id">
                    <User users={users}/>
                </Route>
                <Route path="/users">
                    <Users users={users} />
                </Route>
                <Route path="/blogs/:id">
                    <BlogDetails blogs={blogs} handleDelete={removeBlog} />
                </Route>
                <Route path="/">
                  <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    {blogForm()}
                  </Togglable>
                  {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <Blog key={blog.id} blog={blog} 
                      />
                    ))}
                </Route> 
              </Switch>
            </Router>
        </div>
      )}
    </div>
  )
}

export default App
