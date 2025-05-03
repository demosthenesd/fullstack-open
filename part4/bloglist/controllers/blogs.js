const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer", "");
    }
    return null;
};

blogsRouter.get("/api/blogs", (request, response) => {
    Blog.find({})
        .populate("user", { username: 1, name: 1 })
        .then((blogs) => {
            response.json(blogs);
        });
});

blogsRouter.post("/api/blogs", async (request, response) => {
    const body = request.body;
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id)
        return response.status(401).json({ error: "Token invalid" });
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
