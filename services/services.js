const axios = require("axios");
/**
 * Get clients from source url
 */
exports.getClients = async () => {
  try {
    let res = await axios.get(
      "http://www.mocky.io/v2/5808862710000087232b75ac"
    );
    let result = res.data.clients;
    return result;
  } catch (error) {
    return { err: error };
  }
};

/**
 * Get policies from source url
 */
exports.getPolicies = async () => {
  try {
    let res = await axios.get(
      "http://www.mocky.io/v2/580891a4100000e8242b75c5"
    );
    let policies = res.data.policies;
    return policies;
  } catch (error) {
    return { err: error };
  }
};

/**
 * Get user from clients key(id,name) and value
 */
exports.getUser = (clients, key, value) => {
  if (key === "name") {
    return clients.find(
      (user) => user[key].toLowerCase() === value.toLowerCase()
    );
  } else {
    return clients.find((user) => user[key] === value);
  }
};

/**
 * Get list of policies based on client id or policy based on policy id key(id,clientId)
 */

exports.getPoliciesByClient = (policies, key, value) => {
  if (key === "clientId") {
    return policies.filter((policy) => policy[key] === value);
  } else {
    return policies.find((policy) => policy[key] === value);
  }
};

exports.handleSourceError = (response) => {
  if (response.hasOwnProperty("err")) {
    return true;
  }
};
