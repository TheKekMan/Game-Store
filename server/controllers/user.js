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

module.exports = {
  getUserDetails,
};
