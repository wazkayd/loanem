
import DbConnect from './DbConnect';

/**
 * Represents the loans model.
 */
class LoansModel extends DbConnect {
  /**
       * This function add Loan data into the database
       * @param {string} req - the userid saved in the token
       * @returns {Promise} Returns the queried data .
       */
  placeLoan(req) {
    const data = req.body;
    const amountAndInterest = Math.round( Number(data.amount) + Number((data.amount * 5)/ 100))
    const paymentPerMonth = Math.round(amountAndInterest / data.paymentDuration);
    const loanInterest = amountAndInterest - data.amount;
    const loanerUserId = req.verUserId;
    const name =  req.verUserName;
    const department = req.verUserDept;
    const amount = data.amount;
    const paymentDuration = data.paymentDuration;
    const guarantorOne = data.guarantorOne;
    const guarantorTwo = data.guarantorTwo;
    const guarantorThree = data.guarantorThree;
    const guarantorFour = data.guarantorFour;

    const sql = `INSERT INTO loans(
      user_id, 
      user_name,
      user_dept,
      loan_amount,
      loan_payment_duration,
      loan_guarantor_one, 
      loan_guarantor_two,
      loan_guarantor_three,
      loan_guarantor_four,
      loan_amount_to_pay,
      loan_pay_per_month,
      loan_interest)
      VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *`;
    const params = [
      loanerUserId,
      name,
      department,
      amount,
      paymentDuration,
      guarantorOne,
      guarantorTwo,
      guarantorThree,
      guarantorFour,
      amountAndInterest,
      paymentPerMonth,
      loanInterest
    ];
    console.log(params);
    return this.pool.query(sql, params);
  }

  /**
       * This function get all loan data from the database
       * @returns {Promise} Returns the queried data .
       */
  getAlLoans() {
    const sql = 'SELECT * FROM loans ORDER BY loan_id DESC';
    return this.pool.query(sql);
  }

  /**
       * This function get an loan data from the database
       * @param {object} data - the req.params object .
       * @returns {Promise} Returns the queried data .
       */
  getASpecificUserLoan(data) {
    const sql = 'SELECT * FROM loans WHERE user_id = $1 ORDER BY loan_id DESC';
    const param = [data];
    return this.pool.query(sql, param);
  }

  /**
       * This function update the status of an loan
       * @param {object} idParam - the req.param.id object .
       * @param {object} data - the req.body.userStatus object .
       * @returns {Promise} Returns the queried data .
       */
  updateALoanStatus(idParam, data) {
    const sql = `UPDATE loans SET 
        loan_status = $1
        WHERE loan_id = $2 RETURNING*`;
    const param = [data, idParam];
    return this.pool.query(sql, param);
  }

  /**
       * This function get the loan history for a particular status
       * @param {object} idParam - the req.param.id object .
       * @param {object} data - the req.body.userStatus object .
       * @returns {Promise} Returns the queried data .
       */
  getASpecificHistory(idParam) {
    const sql = `SELECT * FROM loans 
      WHERE loan_status = $1 
      ORDER BY loan_id DESC`;
    const param = [idParam];
    return this.pool.query(sql, param);
  }
}
export default LoansModel;
