const { getUserDetails } = require("../controllers/user");
const Router = require("express").Router();
const auth = require("../middleware/auth");

// Get user details
Router.get("/", auth, getUserDetails);

module.exports = Router;