
import LoansModel from '../models/LoansModel';

const loansModel = new LoansModel();

/* eslint-disable class-methods-use-this */
/**
 * Represents Loans.
 */
class Loans {
  /**
     * This function place an Loan
     * @param {object} req - the request file.
     * @param {object} res - The response file.
     * @returns {object} Returns the posted Loan information.
     */
  addLoan(req, res) {
    loansModel.placeLoan(req)
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(201)
            .json({
              status: 'success',
              message: 'Loan Placed Successfully',
              loan: result.rows[0]
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          status: 'Failed',
          error: 'Failed to place Loan'
        }));
  }

  /**
   * This function get all Loans
   * @param {object} req - the request file.
   * @param {object} res - The response file.
   * @returns {object} Returns the posted Loan information.
   */
  getAllLoans(req, res) {
    loansModel.getAlLoans()
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(200)
            .json({
              status: 'success',
              message: 'No Loan Available',
              loan: []
            });
        }
        return res.status(200)
          .json({
            status: 'success',
            message: 'All Loan Selected',
            loan: result.rows
          });
      })
      .catch(() => res.status(500)
        .json({
          status: 'Failed',
          error: 'Failed'
        }));
  }

  /**
   * This function get a specific Loan
   * @param {object} req - the request file.
   * @param {object} res - The response file.
   * @returns {object} Returns an Loan information.
   */
  getLoan(req, res) {
    loansModel.getASpecificUserLoan(req.params.id)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404)
            .json({
              status: 'Failed',
              error: 'Loan does not exist',
              loan: []
            });
        }
        return res.status(200)
          .json({
            status: 'success',
            message: 'Loan Selected Successfully',
            loan: result.rows
          });
      })
      .catch(() => res.status(500)
        .json({
          status: 'Failed',
          error: 'Failed to load Loan'
        }));
  }


  /**
   * This function edit the Loan status of an Loan
   * @param {object} req - the request file.
   * @param {object} res - The response file.
   * @returns {object} Returns the Loan information.
   */
  updateLoanStatus(req, res) {
    loansModel.updateALoanStatus(req.params.id,
      req.body.loanStatus.toLowerCase())
      .then((result) => {
        if (result.rowCount > 0) {
          return res.status(200)
            .json({
              status: 'success',
              message: 'Loan Status Updated Successfully',
              loan: result.rows[0]
            });
        }
      })
      .catch(() => res.status(500)
        .json({
          status: 'Failed',
          error: 'Failed to load Loan'
        }));
  }
}

export default Loans;
