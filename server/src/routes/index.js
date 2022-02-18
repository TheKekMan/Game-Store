const Router = require("express").Router();
const GamesRouter = require("./games");
const UserRouter = require("./user");
const AuthRouter = require("./auth");
const CartRouter = require("./cart");
const DevRouter = require("./dev");


Router.use("/games", GamesRouter);

Router.use("/cart", CartRouter);

Router.use("/user", UserRouter);

Router.use("/auth", AuthRouter);

Router.use("/devs", DevRouter);

module.exports = Router;
