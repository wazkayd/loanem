
const emailReg = (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const alphaOnly = (/^[a-zA-Z0-9]*$/);
const numOnly = (/^[0-9]*$/);
const signupBtn = document.getElementById('signupBtn');
const loader = document.getElementById('loaderDiv');
const loginBtn = document.getElementById('loginBtn');
const alphaWithSpace = (/^[a-zA-Z0-9 ]*$/);
const alphabetOnly = (/^[a-zA-Z]*$/);

/* eslint-disable class-methods-use-this */
/**
 * Represents the class that handles user authentication.
 */
class UserAuthentication {
  /**
     * This function validate the user input and register the user
     * @returns {object} Returns error or the signup credentials.
     */
  authSignup() {
    const errorHandle = document.getElementById('signUpErrorHandler');
    const email = document.getElementById('userEmail').value;
    const name = document.getElementById('userName').value;
    const password = document.getElementById('password').value;
    const userDept = document.getElementById('userDept');
    const dept = userDept.options[userDept.selectedIndex].value;
    const fileNo = document.getElementById('userFileNo').value;
  
    const repPassword = document.getElementById('confirmPassword').value;
    if (!name) {
      errorHandle.innerHTML = 'Name is Required';
      return false;
    }
    if (!email) {
      errorHandle.innerHTML = 'Email is Required';
      return false;
    }
    if (!fileNo) {
      errorHandle.innerHTML = 'File Number is Required';
      return false;
    }
    if (!password) {
      errorHandle.innerHTML = 'Password is Required';
      return false;
    }
    if (!dept) {
      errorHandle.innerHTML = 'Department is Required';
      return false;
    }
    if (email.length < 6) {
      errorHandle.innerHTML = 'Email should be six character and above';
      return false;
    }
    if (password.length < 6) {
      errorHandle.innerHTML = 'Password can only be six character and above';
      return false;
    }
    if (!email.match(emailReg)) {
      errorHandle.innerHTML = 'Please Enter a valid Email';
      return false;
    }
    if (!fileNo.match(numOnly)) {
      errorHandle.innerHTML = 'File number can only be numbers';
      return false;
    }
    if (!password.match(alphaOnly)) {
      errorHandle.innerHTML = 'Password can only be alphabets and numbers';
      return false;
    }
    if (!name.match(alphaWithSpace)) {
      errorHandle.innerHTML = 'name can only be alphabets and numbers';
      return false;
    }

    if (name.length >= 20) {
      errorHandle.innerHTML = 'name should be less than 20 char';
      return false;
    }
    if (email.length > 40) {
      errorHandle.innerHTML = 'Email should be less than 30 char';
      return false;
    }
    if (password.length > 40) {
      errorHandle.innerHTML = 'Password must be less than 40 char';
      return false;
    }
    if (password !== repPassword) {
      errorHandle.innerHTML = 'Password must match with repeat password';
      return false;
    }
    const uDrl = '/auth/signup';
    const payload = {
      userName: name,
      userEmail: email,
      userPassword: password,
      userDept: dept,
      fileNo: fileNo
    };
    loader.style.display = 'flex';
    this.authPost(uDrl, payload)
      .then((res) => {
        if (res.error) {
          errorHandle.innerHTML = res.error;
          loader.style.display = 'none';
          return false;
        }
        const token = res.token;
        localStorage.setItem('token', token);
        setTimeout(() => {
          loader.style.display = 'flex';
          location.href = 'loans.html';
        },
        2000);
      });
  }

  /**
   * This function validate the user and login the user.
   * @returns {object} Returns error or the login credentials.
   */
  authLogin() {
    const errorHandle = document.getElementById('signUpErrorHandler');
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('password').value;
    if (!email) {
      errorHandle.innerHTML = 'Email is Required';
      return false;
    }
    if (!password) {
      errorHandle.innerHTML = 'Password is Required';
      return false;
    }
    if (email.length < 6) {
      errorHandle.innerHTML = 'Email should be six character and above';
      return false;
    }
    if (password.length < 6) {
      errorHandle.innerHTML = 'Password can only be six character and above';
      return false;
    }
    if (!email.match(emailReg)) {
      errorHandle.innerHTML = 'Please Enter a valid Email';
      return false;
    }
    if (!password.match(alphaOnly)) {
      errorHandle.innerHTML = 'Password can only be alphabets and numbers';
      return false;
    }
    if (email.length > 40) {
      errorHandle.innerHTML = 'Email should be less than 30 char';
      return false;
    }
    if (password.length > 40) {
      errorHandle.innerHTML = 'Password must be less than 40 char';
      return false;
    }
    const uDrl = '/auth/login';
    const payload = {
      userEmail: email,
      userPassword: password
    };
    
    loader.style.display = 'flex';
    this.authPost(uDrl, payload)
      .then((res) => {
        if (res.error) {
          errorHandle.innerHTML = res.error;
          loader.style.display = 'none';
          return false;
        }
        const token = res.token;
        localStorage.setItem('token', token);
        const decoded = jwt_decode(token);
        if (decoded.userRole === 'user') {
          setTimeout(() => {
            loader.style.display = 'flex';
            location.href = 'loans.html';
          },
          1000);
        } else if((decoded.userRole === 'commadmin')) {
          setTimeout(() => {
            loader.style.display = 'flex';
            location.href = './admin/comm-loan.html';
          },
          1000);
        }
        else if(decoded.userRole === 'admin'){
          setTimeout(() => {
            loader.style.display = 'flex';
            location.href = './admin/pres-loan.html';
          },
          1000);
        }
        else if(decoded.userRole === 'tresadmin'){
          setTimeout(() => {
            loader.style.display = 'flex';
            location.href = './admin/tres-loan.html';
          },
          1000);
        }
      });
  }

  /**
       * This function post data to the endpoint
       * @param {object} uDir - the user directory to access.
       * @param {object} payload - The response object.
       * @returns {Promise} Returns the information from the endpoint.
       */
  authPost(uDir, payload) {
    const url = `${hostUrl}${uDir}`;
    return fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json());
  }

  /**
     * This function checks if login is user or admin
     * @param {string} error - error
     * @returns {error} Returns error or the signup credentials.
     */
  displayError(error) {
    errorHandle.innerHTML = error;
    return false;
  }
}

const authentication = new UserAuthentication();

if (signupBtn) {
  signupBtn.onclick = () => {
    authentication.authSignup();
  };
}

if (loginBtn) {
  loginBtn.onclick = () => {
    authentication.authLogin();
  };
}
