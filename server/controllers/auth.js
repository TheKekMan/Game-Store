const pool = require("../db/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Login user
 * @param req
 * @param rep
 * @result {jwt} | error
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await pool.query(
      "SELECT user_id, email_address, balance, password FROM users WHERE email_address = $1",
      [email]
    );
    if (!checkUser.rowCount) {
      return res
        .status(404)
        .json({ message: "User not found. Please register and try again." });
    }
    const checkPass = await bcrypt.compare(
      password,
      checkUser.rows[0].password
    );
    if (!checkPass) {
      return res.status(401).json({
        message: "Email / password doesnot match. Please try again later",
      });
    }
    const userid = await pool.query(
      "SELECT user_id FROM users WHERE email_address = $1",
      [email]
    );

    const payload = {
      user: {
        id: userid.rows[0].user_id,
      },
    };

    consle.log(userid.rows[0].user_id);

    // Sign the JWT token (*)
    jwt.sign(
      payload,
      process.env.JWT_PRIVATE,
      {
        /* from default.json */
        expiresIn: 3600000 /* change to 3600 (1h) for production */,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    return res.status(200).json(resp);
  } catch (err) {
    return res.status(500).json({
      message: "There was an error while logging in. Please try again later",
    });
  }
};

/**
 * Register user
 * @param req
 * @param rep
 * @result {jwt} | error
 */

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const checkEmail = await pool.query(
      "SELECT user_id FROM users WHERE email_address = $1",
      [email]
    );
    if (checkEmail.rowCount > 0) {
      return res.status(409).json({
        message:
          "The email address already exists. Please try with a different email address",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await pool.query(
      "INSERT INTO USERS (email_address, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    const userid = await pool.query(
      "SELECT user_id FROM users WHERE email_address = $1",
      [email]
    );

    const payload = {
      user: {
        id: userid.rows[0].user_id,
      },
    };

    // Sign the JWT token (*)
    jwt.sign(
      payload,
      process.env.JWT_PRIVATE,
      {
        /* from default.json */
        expiresIn: 3600000 /* change to 3600 (1h) for production */,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: "There was an error while registering. Please try again later",
    });
  }
};

/**
 * Check user
 * @param req
 * @param res
 * @return {user} | error
 */
const checkUser = async (req, res) => {
  try {
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [req.user.id]
    );
    if (!checkUser.rowCount)
      return res.status(404).json({ message: "User not found" });
    return res.status(200).json(checkUser.rows[0]);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "There was an error. Please try again later" });
  }
};

/**
 * Change password
 * @param req
 * @param res
 * @return success | error
 */
const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const loggedUserId = req.user.id;
  try {
    const getPassword = await pool.query(
      "SELECT password FROM users WHERE user_id = $1",
      [loggedUserId]
    );
    const checkPass = await bcrypt.compare(
      password,
      getPassword.rows[0].password
    );
    if (!checkPass) {
      return res
        .status(401)
        .json({ message: "Password doesnot match. Please try again later" });
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = $2 WHERE user_id = $1", [
      loggedUserId,
      newHashedPassword,
    ]);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "There was an error. Please try again later" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  checkUser,
  changePassword,
};
