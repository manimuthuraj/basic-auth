const { dbConfig } = require("../../config");

dbConfig();

module.exports = {
    adminUser: require("./adminUser.model"), 
};
