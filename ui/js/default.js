// const hostUrl = 'https://loanem.herokuapp.com/api/v1';
const hostUrl = 'http://localhost:8000/api/v1';

const scrollButton = document.getElementById('arrowP');
const navbarSlider = document.getElementById('header-sm-sc');
const adminNavbarSlider = document.querySelectorAll('.admin-header-bars')[0];
const compOrdDiv = document.getElementById('compOrdDiv');
const canBookBtn = document.getElementById('canBookBtn');
const displayUserNameDropDown = document.getElementsByClassName('dropbtn')[0];

if (typeof decoded !== 'undefined') {
  const firstName = decoded.userName.split(' ')[0];
  displayUserNameDropDown.textContent = firstName;
}

if (canBookBtn) {
  canBookBtn.onclick = () => {
    compOrdDiv.style.display = 'none';
  };
}

const drawNav = () => {
  const navDrawer = document.getElementById('slide-nav');
  navDrawer.classList.toggle('nav-slide-toggle');
};


if (navbarSlider) {
  navbarSlider.addEventListener('click', drawNav);
}
if (adminNavbarSlider) {
  adminNavbarSlider.addEventListener('click', drawNav);
}

const moveDownwards = () => {
  document.body.scrollTop = 600;
  document.documentElement.scrollTop = 600;
};

if (scrollButton) {
  scrollButton.onclick = moveDownwards;
}

