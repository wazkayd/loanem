import express from 'express';
import checkSignUpUserExist from '../middleware/checkSignUpUserExist';
import AuthValidator from '../middleware/AuthValidator';
import UserAuth from '../controllers/UserAuth';

const authRoute = express.Router();

const authValidator = new AuthValidator();
const userAuth = new UserAuth();

authRoute.post('/signup',
  authValidator.signUpValidation,
  checkSignUpUserExist,
  userAuth.registerUser);

authRoute.post('/login',
  authValidator.authInputValidator,
  userAuth.loginUsers);

export default authRoute;
