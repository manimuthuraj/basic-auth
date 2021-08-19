const { UserController } = require("../../controller/index");

const express = require("express");
const userRoutes = express.Router();
const verifyUserToken = require("../../utils/verifyUserToken");
const {
    createAdminUser,
    signInAdminUser,
  } = require("../../validators/user.validator");

//signup admin add admin
userRoutes.post("/admin/signup", createAdminUser, UserController.signupAdmin);
//login admin
userRoutes.post("/admin/signin", signInAdminUser, UserController.signInAdmin);

userRoutes.get("/admin/getUser", verifyUserToken, UserController.getAdminUser);

module.exports = userRoutes;
