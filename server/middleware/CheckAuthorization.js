import jwt from 'jsonwebtoken';
/* eslint-disable class-methods-use-this */
/**
 * Represent check authorization for users and admin
 */
class CheckAuthorization {
  /**
     * This function is a middleware that verify the user token
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages if error
     */
  verifyToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      if (bearerToken) {
        jwt.verify(bearerToken, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            res.status(401)
              .json({
                status: 'Failed',
                error: 'The token you provided is invalid'
              });
          } else {
            req.verUserId = decoded.userId;
            req.verUserName = decoded.userName;
            req.verUserRole = decoded.userRole;
            req.verUserEmail = decoded.userEmail;
            req.verUserDept = decoded.userDept;
            next();
          }
        });
      } else {
        return res.status(401)
          .json({
            status: 'error',
            error: 'Please Organise your token in the specified format'
          });
      }
    } else {
      return res.status(401)
        .json({
          status: 'Failed',
          error: 'No token provided'
        });
    }
  }

  /**
       * This function is a middleware that verify the admin token
       * @param {object} req - the request object.
       * @param {object} res - The response object.
       * @param {func} next - The response object.
       * @returns {object} Returns status code and error messages if error
       */
  verifyAdminToken(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      if (bearerToken) {
        jwt.verify(bearerToken, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            res.status(401)
              .json({
                status: 'Failed',
                error: 'The token you provided is invalid'
              });
          } else {
            if (decoded.userRole !== 'admin' 
              && decoded.userRole !== 'commadmin' 
              && decoded.userRole !== 'tresadmin') {
              return res.status(403)
                .json({
                  status: 'Failed',
                  error: 'You need Admin Privilege to access this Endpoint'
                });
            }
            req.verUserId = decoded.userId;
            req.verUserName = decoded.userName;
            req.verUserRole = decoded.userRole;
            req.verUserEmail = decoded.userEmail;
            req.verUserDept = decoded.userDept;
            next();
          }
        });
      } else {
        return res.status(401)
          .json({
            status: 'error',
            error: 'Please Organise your token in the specified format'
          });
      }
    } else {
      return res.status(401)
        .json({
          status: 'Failed',
          error: 'No token provided'
        });
    }
  }
}

export default CheckAuthorization;
