const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('.navigation');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});