const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

const decoded = jwt_decode(token);
if (decoded.userRole === 'admin') {
  window.addEventListener('DOMContentLoaded', () => {
    const navBigDropDown = document.getElementsByClassName('nav-dropdown');
    navBigDropDown[0].innerHTML += '<a href="admin/all-food.html">Admin</a>';
    navBigDropDown[1].innerHTML += '<a href="admin/all-food.html">Admin</a>';
  }, false);

}


const loggoutUser = () => {
  localStorage.clear();
  location.href = './login.html';
};
