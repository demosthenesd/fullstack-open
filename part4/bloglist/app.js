const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

const userRouter = require("./controllers/users");
const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error connection to MongoDB:", error.message);
    });

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/", blogsRouter);
app.use("/", userRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
