const express = require("express");
const router = express.Router();
const userSchema = require("../utils/userSchema.js");
const { getClients, getUser } = require("../services/services.js");
const jwt = require("jsonwebtoken");
const auth = require("../auth/authCheck");

/**
 * @route Post /login
 * @desc Login a user
 * @access Public
 */

router.post("/login", async (req, res) => {
  const { error } = userSchema.validateUser(req.body);
  const { email } = req.body;
  if (error) return res.status(400).json({ msg: "The email is required!" });
  let clients = await getClients();

  const user = getUser(clients, "email", email);
  if (!user) return res.status(404).json({ msg: "The user does not exist" });
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 1440,
  });
  res.json({
    msg: "Authentication done",
    token: token,
  });
});

/**
 * @route GET /profile
 * @desc Get logged user
 * @access private
 */

router.get("/profile", auth.checkToken, async (req, res) => {
  let clients = await getClients();
  const user = getUser(clients, "id", req.decoded.id);
  res.json(user);
});

module.exports = router;
