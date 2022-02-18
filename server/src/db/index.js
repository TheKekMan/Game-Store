const { Pool } = require("pg");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../../../") + ".env",
});

const pool = new Pool({ connectionString: process.env.DATABASE_URI });

module.exports = pool;
