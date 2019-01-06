const token = localStorage.getItem('token');
if (!token) {
  location.href = './../login.html';
}

const decoded = jwt_decode(token);
if (decoded.userRole !== 'admin') {
  window.location.href = '../login.html';
}

const loggoutUser = () => {
  localStorage.removeItem('token');
  location.href = './../login.html';
};
