const pool = require("../db");

/**
 * Function to get dev details
 * @param req
 * @param res
 * @return Dev details | error
 */
const getDevDetails = async (req, res) => {
  try {
    const dev = await pool.query("SELECT * FROM dev_profile WHERE dev_profile_id = $1", [req.params.id]);
    if (dev.rowCount === 0) {
      res.status(404).send("Developer not found");
    } else {
      const payload = {
        dev: {
          devName: dev.rows[0].dev_name,
          devUrl: dev.rows[0].dev_url,
          devDescription: dev.rows[0].dev_description
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
  getDevDetails
};