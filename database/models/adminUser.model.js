const mongoose = require("mongoose");
const userSchema = require("../schemas").adminUser;

// user model
module.exports = mongoose.model("adminuser", userSchema);
