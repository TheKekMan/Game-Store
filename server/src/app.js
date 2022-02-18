const Express = require("express");
const dotenv = require("dotenv");
const AppRouter = require("./routes");
const Cors = require("cors");
const App = Express();
const port = process.env.PORT || 3000;
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../../") + ".env",
});

App.use(Express.json());
App.use(Cors());

App.use("/gamestore/api/", AppRouter);

if (process.env.NODE_ENV === "production") {
  App.use(Express.static(path.join(__dirname, "../client/dist")));
  App.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

App.listen(port, () => {
  console.log(`Server runnin on port ${port}`);
});
