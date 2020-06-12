require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const clientRoutes = require("./routes/clientRoutes");
app.use(express.json());

/**
 * User routes
 */
app.use("/api/user", userRoutes);

/**
 * Clientes routes
 */

app.use("/api/clients", clientRoutes);

app.get("/api/test", (req, res) => {
  res.send("All good ");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
