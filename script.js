const loginPopup = document.getElementById('loginPopup');
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
e.preventDefault(); 

const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

if (username === 'gladys' && password === '12345') {
    sessionStorage.setItem('isLoggedIn', 'true');
    loginPopup.style.display = 'none';
  } else {
   const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'block';
  }
});

window.addEventListener('load', () => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn || isLoggedIn !== 'true') {
    loginPopup.style.display = 'block';
  }
});

const closePopupButton = document.getElementById('closePopup');
closePopupButton.addEventListener('click', () => {
  loginPopup.style.display = 'none';
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = 'none';
});
