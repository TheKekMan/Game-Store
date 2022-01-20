const Router = require("express").Router();
const GamesRouter = require("./games");
const UserRouter = require("./user");
const AuthRouter = require("./auth");

Router.use("/games", GamesRouter);

Router.use("/user", UserRouter);

Router.use("/auth", AuthRouter);

module.exports = Router;
