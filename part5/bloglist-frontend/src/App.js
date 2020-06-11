import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {

      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      likes: 0,
      url: newUrl,
    };

    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setSuccessMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setNewUrl("");
      setNewTitle("");
      setNewAuthor("");
    });
  };

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    );
  };

  const handleLogOut = () => {
    setUser(null);
    window.localStorage.removeItem("loggedNoteappUser");
  };

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
  );

  return (
    <div>
      <h2>Blogs</h2>

      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <span>{user.name} logged in</span>{" "}
            <button onClick={handleLogOut}>logout</button>
          </div>
          <Togglable buttonLabel='new note' ref={blogFormRef}>
            {blogForm()}
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
