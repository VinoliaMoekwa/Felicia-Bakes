const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.navigation');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}