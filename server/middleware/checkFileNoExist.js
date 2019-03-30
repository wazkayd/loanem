import DbConnect from '../models/DbConnect';

const dbConnect = new DbConnect();

const checkFileNoExist = (req, res, next) => {
  const inputUserFileNo = req.body.fileNo;
  console.log(inputUserFileNo);
  const sql = 'SELECT * FROM files_data WHERE user_file_no = $1';
  const param = [inputUserFileNo];
  dbConnect.pool.query(sql, param)
    .then((result) => {
      if (result.rowCount == 0) {
        return res.status(409)
          .json({ status: 'Failed', error: 'File id does not exist' });
      }
      next();
    });
};

export default checkFileNoExist;
