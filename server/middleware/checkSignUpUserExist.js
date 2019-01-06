import DbConnect from '../models/DbConnect';

const dbConnect = new DbConnect();

const checkSignUpUserExist = (req, res, next) => {
  const inputUserEmail = req.body.userEmail;
  const userEmailSql = 'SELECT * FROM users WHERE user_email = $1';
  const param = [inputUserEmail];
  dbConnect.pool.query(userEmailSql, param)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(409)
          .json({ status: 'Failed', error: 'User already exist' });
      }
      next();
    });
};

export default checkSignUpUserExist;
