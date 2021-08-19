module.exports = {
    dbConfig: require("./db.config").connect,
    statusCodes: require("./httpCodes").data,
};
  