import express from 'express';
import authRoute from './authRoute';
import loanRoute from './loanRoute';
import path from 'path';


const allRoute = express.Router();

allRoute
  .use(express
    .static(path.join(__dirname, '../../ui')));

allRoute
  .use('/api/v1/auth',
    authRoute);

allRoute
  .use('/api/v1/loans',
    loanRoute);

export default allRoute;
