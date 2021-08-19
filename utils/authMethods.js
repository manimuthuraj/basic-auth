const jwt = require("jsonwebtoken");

class generateToken {
  generateToken(payload) {
    try {
      return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      )
    } catch (e) {
      console.log(e);
    }
  }
}



module.exports = new generateToken();