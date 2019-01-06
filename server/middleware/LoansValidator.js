

/* eslint-disable class-methods-use-this */
/**
 * Represent validator for Loans
 */
class LoansValidator {
  /**
     * This function validate the loan status
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and Failed messages
     */
  statusValidator(req, res, next) {
    const status = req.body.loanStatus;
    if (!status) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'status input is required'
        });
    }
    if (typeof status !== 'string') {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Loan status input can only be a string'
        });
    }
    if (status.toLowerCase() === 'committee-cancelled'
      || status.toLowerCase() === 'committee-accepted'
      || status.toLowerCase() === 'accepted'
      || status.toLowerCase() === 'cancelled'
      || status.toLowerCase() === 'complete'
    ) {
      return next();
    }
    return res.status(400).json({
      status: 'Failed',
      error: 'Loan Status can only be recommend and approve'
    });
  }


  /**
     * This function validate the Loan id parameter
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages
     */
  loanIdValidator(req, res, next) {
    const inputTypes = (/^[0-9]*$/);
    const input = req.params.id;
    if (!input.match(inputTypes)) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Loan can only be Integer'
        });
    }
    return next();
  }

  /**
     * This function validate the Loan that is placed to the admin
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns status code and error messages
     */
  placeLoanValidator(req, res, next) {
    const alphaOnly = (/^[a-zA-Z ]*$/);
    const data = req.body;
    const amount = data.amount;
    const paymentDuration = data.paymentDuration;
    const guarantorOne = data.guarantorOne;
    const guarantorTwo = data.guarantorTwo;
    const guarantorThree = data.guarantorThree;
    const guarantorFour = data.guarantorFour;

    if (Object.keys(data).length === 0) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Please Enter valid data'
        });
    }
    if(!amount || amount.trim().length === 0
      || !paymentDuration
      || !guarantorOne || guarantorOne.trim().length === 0
      || !guarantorTwo || guarantorTwo.trim().length === 0
      || !guarantorThree || guarantorThree.trim().length === 0
      || !guarantorFour || guarantorFour.trim().length === 0
    ){
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'All fields are required'
        });
    }
    if(amount > 1500000){
      return res.status(400).json({
        status: 'Failed',
        error: 'Loan Amount should not be more than 1.5 million'
      });
    }
    if(amount < 100000){
      return res.status(400).json({
        status: 'Failed',
        error: 'Loan Amount should be more than one hundred thousand'
      });
    }
    if (!Number(paymentDuration)) {
      return res.status(400).json({
        status: 'Failed',
        error: 'paymentDuration can only be number character'
      });
    }
    if (paymentDuration.length < 1 || paymentDuration.length > 10) {
      return res.status(400).json({
        status: 'Failed',
        error:
        'paymentDuration can only be char greater than one & less than 30'
      });
    }
    if (!guarantorOne.match(alphaOnly)) {
      return res.status(400).json({
        status: 'Failed',
        error: 'First Guarantor can only be alphabet character'
      });
    }
    if (guarantorOne.length < 2 || guarantorOne.length > 30) {
      return res.status(400).json({
        status: 'Failed',
        error:
        'Second Guarantor can only be char greater than one & less than 30'
      });
    }
    if (!guarantorTwo.match(alphaOnly)) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Second Guarantor can only be alphabet character'
      });
    }
    if (guarantorTwo.length < 2 || guarantorTwo.length > 30) {
      return res.status(400).json({
        status: 'Failed',
        error:
        'Second Guarantor can only be char greater than one & less than 30'
      });
    }
    if (!guarantorThree.match(alphaOnly)) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Third Guarantor can only be alphabet character'
      });
    }
    if (guarantorThree.length < 2 || guarantorThree.length > 30) {
      return res.status(400).json({
        status: 'Failed',
        error:
        'Third Guarantor can only be char greater than one & less than 30'
      });
    }
    if (!guarantorFour.match(alphaOnly)) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Second Guarantor can only be alphabet character'
      });
    }
    if (guarantorFour.length < 2 || guarantorFour.length > 30) {
      return res.status(400).json({
        status: 'Failed',
        error:
        'Second Guarantor can only be char greater than one & less than 30'
      });
    }
    return next();
  }
}

export default LoansValidator;
