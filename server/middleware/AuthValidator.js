
// email regex idea gotten from stackoverflow

const emailReg = (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const alphaOnly = (/^[a-zA-Z0-9]*$/);
const alphaWithSpace = (/^[a-zA-Z0-9 ]*$/);

/* eslint-disable class-methods-use-this */
/**
 * Represents Authentication Validation.
 */
class AuthValidator {
  /**
     * This function validate the authentication input by user
     * @param {object} req - the request object.
     * @param {object} res - The response object.
     * @param {func} next - The response object.
     * @returns {object} Returns error or move to next middleware if no error
     */
  authInputValidator(req, res, next) {
    const textInput = req.body;
    const whitespace = (/([\s]+)/g);
    const email = textInput.userEmail;
    const password = textInput.userPassword;
    const name = textInput.userName;


    if (!email || !password) {
      return res.status(400).json({
        error: 'Please fill all field'
      });
    }
    if (typeof email !== 'string'
    || typeof password !== 'string') {
      return res.status(400).json({
        error: 'Invalid input type'
      });
    }
    if (password.match(whitespace) || email.match(whitespace)) {
      return res.status(400).json({
        status: 'Failed',
        error: 'White spaces are not allowed in input'
      });
    }
    if (email.length < 6) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Email should be six character and above'
        });
    }
    if (password.length < 6) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Password can only be six character and above'
        });
    }
    if (!email.match(emailReg)) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Please Enter a valid Email'
        });
    }
    if (!password.match(alphaOnly)) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Password can only be alphabets and numbers'
        });
    }
    if (email.length > 30) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Email should be less than 30 char'
      });
    }
    if (password.length > 40) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Password must be less than 40 char'
      });
    }
    next();
  }

  signUpValidation(req, res, next){
    const textInput = req.body;
    const whitespace = (/([\s]+)/g);
    const email = textInput.userEmail;
    const password = textInput.userPassword;
    const name = textInput.userName;
    const dept = textInput.userDept;


    if (!email || !password || !name || !dept) {
      return res.status(400).json({
        error: 'Please fill all field'
      });
    }
    if (typeof email !== 'string'
    || typeof password !== 'string'
    || typeof name !== 'string'
    || typeof dept !== 'string') {
      return res.status(400).json({
        error: 'Invalid input type'
      });
    }
    if (password.match(whitespace) || email.match(whitespace)) {
      return res.status(400).json({
        status: 'Failed',
        error: 'White spaces are not allowed in input'
      });
    }
    if (email.length < 6) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Email should be six character and above'
        });
    }
    if (password.length < 6) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Password can only be six character and above'
        });
    }
    if (!email.match(emailReg)) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Please Enter a valid Email'
        });
    }
    if (!password.match(alphaOnly)) {
      return res.status(400)
        .json({
          status: 'Failed',
          error: 'Password can only be alphabets and numbers'
        });
    }
    if (email.length > 30) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Email should be less than 30 char'
      });
    }
    if (password.length > 40) {
      return res.status(400).json({
        status: 'Failed',
        error: 'Password must be less than 40 char'
      });
    }
      if (name.length >= 20) {
        return res.status(400).json({
          status: 'Failed',
          error: 'name should be less than 20 char'
        });
      }
      if (!name.match(alphaWithSpace)) {
        return res.status(400).json({
          status: 'Failed',
          error: 'name can only be char and number'
        });
      }

    next();
  }
}

export default AuthValidator;
