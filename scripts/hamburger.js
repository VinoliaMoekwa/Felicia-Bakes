const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.navigation');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('show'));
  });
}
