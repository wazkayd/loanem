import DbConnect from '../models/DbConnect';

const dbConnect = new DbConnect();

const checkSignUpUserExist = (req, res, next) => {
  const userId =  req.verUserId;
  const userIdSql = 'SELECT * FROM loans WHERE user_id = $1';
  const param = [userId];
  dbConnect.pool.query(userIdSql, param)
    .then((result) => {
      if (result.rowCount === 0) {
        return next();
      }
      const completed = 'complete';
      const committeeCompleted = 'committee-cancelled'
      const loanCompletedSql = 'Select * FROM loans WHERE user_id =$1 AND (loan_status != $2 AND loan_status != $3)';
      const secondParams = [userId, completed, committeeCompleted];
      dbConnect.pool.query(loanCompletedSql, secondParams)
        .then((result) => {
            if(result.rowCount !== 0){
                return res.status(409)
                    .json({ status: 'Failed', error: 'Please Complete your pending loan Payments first' });
            }
            next();
        })
    });
};

export default checkSignUpUserExist;
