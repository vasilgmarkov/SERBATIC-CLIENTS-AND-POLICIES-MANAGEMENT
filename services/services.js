const axios = require("axios");
/**
 * Get clients from source url
 */
exports.getClients = async () => {
  try {
    let res = await axios.get(
      "http://www.mocky.io/v2/5808862710000087232b75ac"
    );
    let clients = res.data.clients;
    return clients;
  } catch (error) {
    return { err: error };
  }
};

/**
 * Get user from clients key(id,name) and value
 */
exports.getUser = (clients, key, value) => {
  return clients.find((user) => user[key] === value);
};
