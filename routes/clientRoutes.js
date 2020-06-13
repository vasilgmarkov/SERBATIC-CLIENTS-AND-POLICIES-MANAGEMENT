const express = require("express");
const router = express.Router();
const {
  getClients,
  getUser,
  handleSourceError,
} = require("../services/services.js");
const auth = require("../auth/authCheck");

/**
 * @route GET /:id
 * @desc Get a client by id
 * @access private
 */
router.get("/:id", auth.checkToken, async (req, res) => {
  const clientId = req.params.id;

  if (!clientId) res.status(404).json({ msg: "No id param provided" });
  let result = await getClients();
  if (handleSourceError(result))
    return res.status(500).json({ msg: "Internal Server Error" });
  const user = getUser(result, "id", req.decoded.id);
  if (user.role === "user" || user.role === "admin") {
    const client = getUser(result, "id", clientId);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ msg: "No client found" });
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
  let result = await getClients();
  if (handleSourceError(result))
    return res.status(500).json({ msg: "Internal Server Error" });
  const user = getUser(result, "id", req.decoded.id);
  if (user.role === "user" || user.role === "admin") {
    const client = getUser(result, "name", clientName);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ msg: "No client found" });
    }
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
});

module.exports = router;
