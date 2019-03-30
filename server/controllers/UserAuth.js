import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AuthModel from '../models/AuthModel';
import sendEmail from '../helpers/email/sendEmail';
import emailTemplate from '../helpers/email/emailTemplate';

const authModel = new AuthModel();

/* eslint-disable class-methods-use-this */
/**
 * Represents Order.
 */
class UserAuth {
  /**
     * This function login new user
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns success message and jwt token.
     */
  registerUser(req, res) {
    authModel.userSignup(req.body)
      .then((result) => {
        const token = jwt.sign({
          userId: result.rows[0].user_id,
          userName: result.rows[0].user_name,
          userRole: result.rows[0].user_role,
          userEmail: result.rows[0].user_email,
          userDept: result.rows[0].user_dept,
          userFileNo: result.rows[0].user_file_no
        }, process.env.JWT_KEY);
        sendEmail(result.rows[0].user_email, emailTemplate.welcome);
        return res.status(201)
          .json({
            status: 'success',
            message: 'Registration Successful',
            token
          });
      }).catch(() => res.status(500)
        .json({
          status: 'Failed',
          error: 'Registration failed'
        }));
  }

  /**
     * This function register a new user
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @returns {object} Returns success message and jwt token.
     */
  loginUsers(req, res) {
    authModel.userSignIn(req.body)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(401)
            .json({
              status: 'Failed',
              error: 'Incorrect Email/Password'
            });
        } if (bcrypt.compareSync(req.body.userPassword,
          result.rows[0].user_password)) {
          const token = jwt.sign({
            userId: result.rows[0].user_id,
            userName: result.rows[0].user_name,
            userRole: result.rows[0].user_role,
            userEmail: result.rows[0].user_email,
            userDept: result.rows[0].user_dept,
            userFileNo: result.rows[0].file_no,
          }, process.env.JWT_KEY);
          return res.status(200)
            .json({
              status: 'success',
              message: 'Login Successful',
              token
            });
        }
        return res.status(401)
          .json({
            status: 'Failed',
            error: 'Incorrect Email/Password'
          });
      })
      .catch(() => {
        res.status(500).json({
          status: 'Failed',
          error: 'Login Fail'
        });
      });
  }
}
export default UserAuth;
