document.addEventListener("DOMContentLoaded", function() {
  const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,

    speed: 1,

    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});
