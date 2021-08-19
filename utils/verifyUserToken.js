
const authenticate = require('./authenticate')

// exporting the hooks 
module.exports = async (req, res, next) => {
  try {
    let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.replace("Bearer", "");
        } else {
            token = req.headers["x-access-token"];
        }
    
    if (!token) {
       return res.status(401).send({
            status: false,
            erroType: 'invalidToken'
          })
    }

    let checkToken = await authenticate.verifyToken(token);
    
    if (checkToken.status === true) {
      req.user = checkToken.data
      next();
    } else {
       return res.status(401).send({
            status: false,
            erroType: 'unAuthorized'
          })
    }
  } catch (e) {
    console.log(e);
   return res.status(500).send({
        status: false,
        erroType: 'HTTP_INTERNAL_SERVER_ERROR'
      })
  }
};
