
import express from 'express';
import Loans from '../controllers/Loans';
import CheckAuthorization from '../middleware/CheckAuthorization';
import LoansValidator from '../middleware/LoansValidator';
import checkUserLoanExist from '../middleware/checkUserLoanExist';


const checkAuthorization = new CheckAuthorization();
const loanRoute = express.Router();
const loans = new Loans();
const loansValidator = new LoansValidator();

loanRoute
  .post('/',
    checkAuthorization
      .verifyToken,
    loansValidator
      .placeLoanValidator,
    checkUserLoanExist,
    loans.addLoan);

loanRoute
  .get('/',
    checkAuthorization
      .verifyAdminToken,
    loans.getAllLoans);

loanRoute
  .put('/:id',
    checkAuthorization
      .verifyAdminToken,
    loansValidator
      .statusValidator,
    loansValidator
      .loanIdValidator,
    loans.updateLoanStatus);


loanRoute
  .get('/:id',
    checkAuthorization
      .verifyToken,
    loansValidator
      .loanIdValidator,
    loans.getLoan);

export default loanRoute;
