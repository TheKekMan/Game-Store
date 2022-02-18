const pool = require("../db");

/**
 * Function to get user details
 * @param req
 * @param res
 * @return User details | error
 */
const getUserDetails = async (req, res) => {
  try {
    const user = await pool.query("SELECT name, second_name, avatar_url, birthday FROM profile WHERE user_id = $1", [req.user.id.id]);
    if (user.rowCount === 0) {
      const emptyPayload = {
        user: {
          name: "",
          secondName: " ",
          avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
          birthday: "01.01.1970"
        }
      };
      res.json(emptyPayload);
    } else {
      const payload = {
        user: {
          name: user.rows[0].name,
          secondName: user.rows[0].second_name,
          avatar: user.rows[0].avatar_url,
          birthday: user.rows[0].birthday
        }
      };
      res.json(payload);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getUserDetails
};