import bcrypt from 'bcrypt';
import DbConnect from './DbConnect';

/**
 * Represents Order.
 */
class AuthModel extends DbConnect {
  /**
     * This function add user data into the database
     * @param {object} data - the req.body object .
     * @returns {Promise} Returns token and status.
     */
  userSignup(data) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(data.userPassword, salt);
    const sql = `INSERT INTO 
        users(user_email, user_password, user_name, user_dept, user_file_no)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const params = [data.userEmail, hashPassword, data.userName, data.userDept, data.fileNo];
    return this.pool.query(sql, params);
  }

  /**
     * This function login a user into the database
     * @param {object} data - the req.body object.
     * @returns {Promise} Returns token and status.
     */
  userSignIn(data) {
    const inputEmail = data.userEmail;
    console.log(data)
    const emailSql = 'select * from users where user_email = $1';
    const param = [inputEmail];
    return this.pool.query(emailSql, param);
  }
}
export default AuthModel;
