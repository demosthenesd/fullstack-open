const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/api/users", (request, response) => {
    User.find({}).then((users) => {
        response.json(users);
    });
});

usersRouter.post("/api/users", (request, response) => {
    const user = new User(request.body);

    user.save().then((result) => {
        response.status(201).json(result);
    });
});

module.exports = usersRouter;
