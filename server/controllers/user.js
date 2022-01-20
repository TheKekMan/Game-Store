const pool = require("../db/");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");

dotenv.config();

function randomKeyGenerator() {
  const letters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let word = "";

  for (let i = 0; i < 15; i++) {
    word += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  this.randomKey =
    word.substr(0, 5) + "-" + word.substr(5, 5) + "-" + word.substr(10, 5);

  return this.randomKey.toUpperCase();
}

/**
 * Function to get user details
 * @param req
 * @param res
 * @return User details | error
 */
const getUserDetails = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT email_address FROM user WHERE user_id = $1",
      [req.user.id.id]
    );
    console.log(user.rows[0].email_addrress);
    return res.status(200).json(user.rows[0].email_addrress);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "There was an error. Please try again later" });
  }
};

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
      return res
        .status(401)
        .json({
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
    return res
      .status(500)
      .json({
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
    return res
      .status(500)
      .json({
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

const addToCart = async (req, res) => {
  const { gameid, title, price, poster, userid } = req.body;

  try {
    const gameCheck = await pool.query(
      "SELECT game_name FROM games WHERE game_id = $1 AND game_name = $2",
      [gameid, title]
    );
    if (gameCheck.rowCount == 0) {
      return res.status(401).json({ message: "Undefined game" });
    }
    const randomkey = randomKeyGenerator();
    hashedRandomkey = CryptoJS.AES.encrypt(
      randomkey,
      process.env.CRYPTO_KEY
    ).toString();
    const ins = await pool.query(
      "INSERT INTO gkey (game_id, user_id, gkey_value) VALUES ($1, $2, $3)",
      [gameid, userid, hashedRandomkey]
    );
    const getid = await pool.query(
      "SELECT gkey_id FROM gkey WHERE gkey_value = $1",
      [hashedRandomkey]
    );
    const gkey_id = getid.rows[0].gkey_id;
    return res.status(200).json({ gkey_id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "There was an error. Please try again later" });
  }
};

const remFromCart = async (req, res) => {
  const { gkeyid } = req.body;

  try {
    const gkeyCheck = await pool.query(
      "SELECT gkey_id FROM gkey WHERE gkey_id = $1",
      [gkeyid]
    );
    if (gkeyCheck.rowCount == 0) {
      return res.status(401).json({ message: "Not found" });
    }
    const del = await pool.query("DELETE FROM gkey WHERE gkey_id = $1", [
      gkeyid,
    ]);
    return res.status(200).json({ message: "Game deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "There was an error. Please try again later" });
  }
};

const getFromCart = async (req, res) => {
  const userid = req.header("userid");

  try {
    const userCheck = await pool.query(
      "SELECT user_id FROM users WHERE user_id = $1",
      [userid]
    );
    if (userCheck.rowCount == 0) {
      return res.status(401).json({ message: "user not found" });
    }
    const item = await pool.query(
      "SELECT gkey_id as gkeyid, gkey.game_id as gameId,user_id as userid, game_name as title, price, picture as poster, status, discount, CASE WHEN status = true THEN gkey_value ELSE null END as value FROM gkey join games ON gkey.game_id = games.game_id WHERE user_id = $1",
      [userid]
    );
    item.rows.forEach((item) =>
      item.value
        ? (item.value = CryptoJS.AES.decrypt(
            item.value,
            process.env.CRYPTO_KEY
          ).toString(CryptoJS.enc.Utf8))
        : (item.value = null)
    );
    const decryptCodes = item;
    const items = decryptCodes.rows;
    if (item.rowCount == 0) {
      return res.status(402).json({ message: "No games" });
    }
    return res.status(200).json({ items });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "There was an error. Please try again later" });
  }
};

const buyFromCart = async (req, res) => {
  const { gkeyid } = req.body;
  const userid = req.user.id.id;

  try {
    const gkeyCheck = await pool.query(
      "SELECT gkey_id FROM gkey WHERE gkey_id = $1",
      [gkeyid]
    );
    if (gkeyCheck.rowCount == 0) {
      return res.status(401).json({ message: "Not found" });
    }
    const userBalanceCheck = await pool.query(
      "SELECT (price - price * discount) as price FROM gkey JOIN users ON users.user_id = gkey.user_id JOIN games ON gkey.game_id = games.game_id WHERE users.user_id = $1 AND gkey.gkey_id = $2 AND balance >= (price - price * discount)  ",
      [userid, gkeyid]
    );
    // if(userBalanceCheck.rowCount == 0){
    //   return res.status(401).json({ message: 'Not enough money' })
    // }
    // else{
    //   const balanceupd = await pool.query(
    //     'UPDATE users SET balance = balance - $1 WHERE user_id = $2',
    //     [userBalanceCheck.rows[0].price, userid]
    //   )
    // }
    const upd = await pool.query(
      "UPDATE gkey SET status = true WHERE gkey_id = $1",
      [gkeyid]
    );
    const item = await pool.query(
      "SELECT gkey_id as gkeyid, gkey.game_id as gameId,user_id as userid, game_name as title, price, picture as poster, status, CASE WHEN status = true THEN gkey_value ELSE null END as value FROM gkey join games ON gkey.game_id = games.game_id WHERE gkey_id = $1",
      [gkeyid]
    );
    item.rows.forEach((item) =>
      item.value
        ? (item.value = CryptoJS.AES.decrypt(
            item.value,
            process.env.CRYPTO_KEY
          ).toString(CryptoJS.enc.Utf8))
        : (item.value = null)
    );
    const decryptCodes = item;
    const items = decryptCodes.rows;
    if (item.rowCount == 0) {
      return res.status(402).json({ message: "No game" });
    }
    return res.status(200).json({ items });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "There was an error. Please try again later" });
  }
};

module.exports = {
  getUserDetails,
  loginUser,
  registerUser,
  checkUser,
  changePassword,
  addToCart,
  remFromCart,
  getFromCart,
  buyFromCart,
};
