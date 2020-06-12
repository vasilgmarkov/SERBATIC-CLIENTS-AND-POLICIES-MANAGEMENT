const express = require("express");
const router = express.Router();
const {
  getClients,
  getUser,
  getPolicies,
  getPoliciesByClient,
} = require("../services/services.js");
const auth = require("../auth/authCheck");

/**
 * @route GET /:clientName
 * @desc Get a policies by clientName
 * @access private
 */

router.get("/client/:clientName", auth.checkToken, async (req, res) => {
  const clientName = req.params.clientName;
  if (!clientName) res.status(404).json({ msg: "No name param provided" });
  let clients = await getClients();
  const user = getUser(clients, "id", req.decoded.id);
  if (user.role === "admin") {
    const client = getUser(clients, "name", clientName);
    if (client) {
      let policies = await getPolicies();
      let userPolicies = getPoliciesByClient(policies, "clientId", client.id);
      if (userPolicies.length !== 0) {
        res.json(userPolicies);
      } else {
        res.status(404).json({ msg: "No policies found" });
      }
    } else {
      res.status(404).json({ msg: `No client with name: ${clientName}` });
    }
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
});

/**
 * @route GET /:id
 * @desc Get a client by policy id
 * @access private
 */

router.get("/:id", auth.checkToken, async (req, res) => {
  const policyId = req.params.id;
  if (!policyId) res.status(404).json({ msg: "No name param provided" });
  let clients = await getClients();
  const user = getUser(clients, "id", req.decoded.id);
  if (user.role === "admin") {
    let policies = await getPolicies();
    let policy = getPoliciesByClient(policies, "id", policyId);
    if (policy) {
      const client = getUser(clients, "id", policy.clientId);
      if (client) {
        res.json(client);
      } else {
        res.status(404).json({ msg: "No client found" });
      }
    } else {
      res.status(404).json({ msg: `No policy with id: ${policyId}` });
    }
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
});

module.exports = router;
