const Router = require("express").Router();
const pool = require("../db");
// const {
//   getUserPosts,
// } = require('../controllers/post')
//const { check, validationResult } = require('express-validator');
const auth = require("../middleware/auth");

Router.get("/", async (req, res) => {
  try {
    const games = await pool.query("SELECT * FROM games");
    res.json({ gameResults: games });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const game = await pool.query("SELECT * FROM games WHERE game_id = $1", [
      req.params.id,
    ]);
    // Check if there's a game with that ID:
    if (game.rowCount == 0) {
      return res.status(404).json({ msg: "Game not found" });
    }
    const dev = await pool.query(
      "SELECT dev_name FROM dev_profile WHERE dev_profile_id = $1",
      [game.rows[0].developer]
    );
    if (dev.rowCount == 0) {
      game.rows[0].developer_name = "unknown";
    } else game.rows[0].developer_name = dev.rows[0].dev_name;
    res.json(game.rows[0]);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Game not found" });
    }
    res.status(500).send("Server Error");
  }
});

Router.get("/search/:query", async (req, res) => {
  try {
    const searchExp1 = "%" + req.params.query + "%";
    const searchExp2 = req.params.query + "%";
    const searchExp3 = "%" + req.params.query;
    const games = await pool.query(
      "SELECT * FROM games WHERE (game_name ilike $1 OR game_name ilike $2 OR game_name ilike $3) OR (genre ilike $1 OR genre ilike $2 OR genre ilike $3)",
      [searchExp1, searchExp2, searchExp3]
    );
    res.json({ gameResults: games });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Game not found" });
    }
    res.status(500).send("Server Error");
  }
});

Router.get("/tag/:query", async (req, res) => {
  try {
    const searchTag = req.params.query;
    const games = await pool.query("SELECT * FROM games WHERE genre ilike $1", [
      searchTag,
    ]);
    res.json({ gameResults: games });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Game not found" });
    }
    res.status(500).send("Server Error");
  }
});

Router.get("/dev/:query", async (req, res) => {
  try {
    const searchId = req.params.query;
    const games = await pool.query("SELECT * FROM games WHERE developer = $1", [
      searchId,
    ]);
    res.json({ gameResults: games });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Game not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = Router;
