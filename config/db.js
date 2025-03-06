require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "", 
  database: process.env.DB_NAME || "secret_santa"
});

db.connect(err => {
  if (err) {
    console.error(" Connection Error:", err.message);
    process.exit(1);
  }
  console.log("DB Connected");
});

module.exports = db;
