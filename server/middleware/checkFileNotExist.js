import DbConnect from '../models/DbConnect';

const dbConnect = new DbConnect();

const checkFileNotExist = (req, res, next) => {
  const fileNo = req.body.fileNo;
  const userFileNoSql = 'SELECT * FROM users WHERE user_file_no = $1';
  const param = [fileNo];
  dbConnect.pool.query(userFileNoSql, param)
    .then((result) => {
      if (result.rowCount !== 0) {
        return res.status(409)
          .json({ status: 'Failed', error: 'User with this file no already exist' });
      }
      next();
    });
};

export default checkFileNotExist;
