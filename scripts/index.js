//Hamburger Menu
  document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
    const navbarLinks = document.getElementById('navbar-links');
  
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('active');
    });
  });