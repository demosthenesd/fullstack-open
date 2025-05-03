const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/api/users", async (request, response) => {
    const users = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
    });

    response.json(users);
});

usersRouter.post("/api/users", async (request, response) => {
    const user = new User(request.body);

    user.save().then((result) => {
        response.status(201).json(result);
    });
});

module.exports = usersRouter;
