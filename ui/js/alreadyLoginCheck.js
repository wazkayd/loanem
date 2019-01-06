
if (localStorage.getItem('token')) {
  const decoded = jwt_decode(localStorage.getItem('token'));
  if (decoded.userRole === 'user') {
    location.href = 'loans.html';
  } else if (decoded.userRole === 'commadmin') {
    location.href = './admin/comm-loan.html';
  }
  else if(decoded.userRole === 'admin'){
    location.href = './admin/pres-loan.html';
  }
}
