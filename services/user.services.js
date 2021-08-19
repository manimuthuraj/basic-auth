require("dotenv/config");
const { adminUser } = require("../database/models");
var ObjectId = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { statusCodes } = require("../config");
const authMethods = require("../utils/authMethods");

class UserService {}

UserService.signupAdmin = async (body) => {
  try {
    //check user name already exist
    const findUser = await adminUser.findOne({ email: body.email });
    if (findUser) {
      return {
        code: statusCodes.HTTP_BAD_REQUEST,
        message: "email Already Exist",
      };
    }

    //Hasing password
    const hashPassword = await bcrypt.hashSync(
      body.password,
      bcrypt.genSaltSync(8),
      null
    );

    //creating user
    const createUserAdmin = await adminUser.create({
      userName: body.userName,
      password: hashPassword,
      email: body.email,
    });

    if (!createUserAdmin) {
      return {
        code: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        message: "SomeThing Went Worng",
      };
    }
    return {
      code: statusCodes.HTTP_OK,
      message: "Successfull Now Login",
    };
  } catch (err) {
    throw new Error(err);
  }
};

UserService.signInAdmin = async (body) => {
  try {
    //checking user exist
    const findUser = await adminUser.findOne({ email: body.email });
    console.log(findUser);
    if (!findUser) {
      return {
        code: statusCodes.HTTP_BAD_REQUEST,
        message: "Wrong email",
      };
    }

    //comparing password
    const comparePassword = await bcrypt.compare(
      body.password,
      findUser.password
    );

    if (!comparePassword) {
      return {
        code: statusCodes.HTTP_BAD_REQUEST,
        message: "Wrong Password",
      };
    }

    //creating token
    let token = await authMethods.generateToken(
      {
        _id: findUser._id,
        userName: findUser.userName,
      },
      process.env.JWT_SECRET
    );

    const data = {
      userId: findUser._id,
      userName: findUser.userName,
      token: token,
    };

    return {
      code: statusCodes.HTTP_OK,
      message: "Successfully  LogedIn",
      data: data,
    };
  } catch (err) {
    throw new Error(err);
  }
};

UserService.getAdminUser = async (body) => {
  try {
    const getUser = await adminUser.find({});

    if (!getUser) {
      return {
        code: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        message: "SomeThing Went Worng",
      };
    }
    return {
      code: statusCodes.HTTP_OK,
      message: "User listed successfully",
      data: getUser,
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = UserService;
