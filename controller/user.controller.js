const { UserService } = require("../services");

class UserController {}

//signup Admin Create Admin
UserController.signupAdmin = async (req, res, next) => {
  try {
    let body = req.body;
    let result = await UserService.signupAdmin(body);

    const status = result.code == 200 ? "Success" : "Fail";
    res.status(result.code).json({
      status: status,
      message: result.message,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Some thing went wrong Internal server Error",
    });
  }
};

//signin user
UserController.signInAdmin = async (req, res, next) => {
  try {
    let body = req.body;
    let result = await UserService.signInAdmin(body);

    const status = result.code == 200 ? "Success" : "Fail";
    res.status(result.code).json({
      status: status,
      message: result.message,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Some thing went wrong Internal server Error",
    });
  }
};

//get user
UserController.getAdminUser = async (req, res, next) => {
  try {
    let result = await UserService.getAdminUser();

    const status = result.code == 200 ? "Success" : "Fail";
    res.status(result.code).json({
      status: status,
      message: result.message,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Some thing went wrong Internal server Error",
    });
  }
};

module.exports = UserController;
