const {
  registerUser,
  loginUser,
  checkUser,
  changePassword,
} = require("../controllers/auth");
const Router = require("express").Router();
const authUser = require("../Services/Auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db");
const auth = require("../middleware/auth");

// Register user
Router.post("/register", registerUser);

// Login user
Router.post("/login", loginUser);

// Update password
Router.post("/update/password", changePassword);

// Check logged in and get details
Router.get("/checkout", authUser, checkUser);

Router.get("/auth", auth, async (req, res) => {
  try {
    // Send the id, but exclude the password ?
    const user = await pool.query(
      "SELECT email_address, user_id, balance FROM users WHERE user_id = $1",
      [req.user.id.id]
    );
    const userGames = await pool.query(
      "SELECT users.user_id, game_name, games.game_id, status, add_date, release_date, description, genre, picture, price, developer, discount FROM users JOIN gkey ON users.user_id = gkey.user_id JOIN games ON gkey.game_id = games.game_id WHERE users.user_id = $1",
      [req.user.id.id]
    );
    const payload = {
      user: {
        email: user.rows[0].email_address,
        userid: user.rows[0].user_id,
        balance: user.rows[0].balance,
        gamesOwned: userGames.rows,
      },
    };
    res.json(payload);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

Router.post("/auth", [], async (req, res) => {
  // Destructuring req.body and pulling out a few things from there:
  const { email, password } = req.body;

  try {
    // See if user exists:
    const User = await pool.query(
      "SELECT user_id, email_address, password FROM users WHERE email_address = $1",
      [email]
    );
    let user = await User.rowCount;
    if (user == 0) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    // Create the JWT payload:
    const payload = {
      user: {
        id: User.rows[0].user_id,
      },
    };

    // Matching the email & password - compare with bcrypt
    const isMatch = await bcrypt.compare(password, User.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Sign the JWT token (*)
    jwt.sign(
      payload,
      process.env.JWT_PRIVATE,
      {
        /* .env*/ expiresIn: 360000 /* change to 3600 (1h) for production */,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = Router;
