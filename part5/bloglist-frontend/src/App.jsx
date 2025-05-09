import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

import Notification from "./components/Notification";
import loginService from "./services/login";
const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");

    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
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
            window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
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

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem("loggedBlogAppUser");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("WEWE");
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );

    if (user === null) {
        return (
            <div>
                <Notification message={errorMessage} />
                <h2>Log in to application</h2>
                {loginForm()}
            </div>
        );
    }

    return (
        <div>
            <Notification message={errorMessage} />
            <h2>blogs</h2>
            <h4>Welcome, youre logged in {user.name}</h4>
            <button onClick={handleLogout}> logout </button>
            <form onSubmit={handleSubmit}>
                <div>
                    Title:{" "}
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />{" "}
                </div>
            </form>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default App;
