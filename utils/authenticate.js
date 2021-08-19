require('dotenv').config();

const jwt = require('jsonwebtoken');
const { adminUser, } = require("../database/models");

// authenticate
function authenticate() {
  const methods = {

    verifyToken: async (token) => {
      try {

        let decoded = await jwt.verify(token, process.env.JWT_SECRET);
        let userData = '';
        userData = await adminUser.find({_id:decoded._id})

        if (userData) {
          return {
            status: true,
            data: {...decoded}
          }
        } else {
          return {
            status: false,
            erroType: 'userNotFound'
          }
        }
      } catch (err) {
        console.log("err", err);
        if (err.name === 'TokenExpiredError')
          return {
            status: false,
            erroType: 'TokenExpiredError'
          }
        else if (err.name === 'JsonWebTokenError')
          return {
            status: false,
            erroType: 'TokenExpiredError'
          }
        else
          return {
            status: false,
            erroType: 'TokenExpiredError'
          }
      }
    },
  };

  // return Object freeze 
  return Object.freeze(methods);
}

// exporting the modules 
module.exports = authenticate();
