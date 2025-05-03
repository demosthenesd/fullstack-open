const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/api/users", async (request, response) => {
    const users = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
    });

    response.json(users);
});

usersRouter.post("/api/users", async (request, response) => {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds);
    console.log("psasworordHash", passwordHash);
    const username = request.body.username;
    const name = request.body.name;
    const user = new User({
        username,
        passwordHash,
        name,
    });

    const savedUser = await user.save().then((result) => {
        response.status(201).json(result);
    });
});

module.exports = usersRouter;
