const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const santaRoutes = require("./routes/santaRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/employees", employeeRoutes);
app.use("/api/santa", santaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

