const express = require("express");
const router = express.Router();
const { getClients, getUser } = require("../services/services.js");
const auth = require("../auth/authCheck");

/**
 * @route GET /:id
 * @desc Get a client by id
 * @access private
 */
router.get("/:id", auth.checkToken, async (req, res) => {
  const clientId = req.params.id;
  if (!clientId) res.status(404).json({ msg: "No id param provided" });
  let clients = await getClients();
  const user = getUser(clients, "id", req.decoded.id);
  if (user.role === "user" || user.role === "admin") {
    const client = getUser(clients, "id", clientId);
    if (client) {
      res.json(client);
    } else {
      res.json({ msg: "No client found" });
    }
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
});

/**
 * @route GET /:name
 * @desc Get a client by name
 * @access private
 */
router.get("/name/:name", auth.checkToken, async (req, res) => {
  const clientName = req.params.name;
  if (!clientName) res.status(404).json({ msg: "No name param provided" });
  let clients = await getClients();
  const user = getUser(clients, "id", req.decoded.id);
  if (user.role === "user" || user.role === "admin") {
    const clientsByName = getUser(clients, "name", clientName);
    if (clientsByName.length !== 0) {
      res.json(clientsByName);
    } else {
      res.json({ msg: "No client found" });
    }
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
});

module.exports = router;
