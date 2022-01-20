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
  addToCart,
  remFromCart,
  getFromCart,
  buyFromCart,
};
