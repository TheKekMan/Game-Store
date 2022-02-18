const { getDevDetails } = require("../controllers/dev");
const Router = require("express").Router();

// Get dev details
Router.get("/:id", getDevDetails);

module.exports = Router;