document.addEventListener('DOMContentLoaded', () => {
  const heads = document.querySelectorAll('.questions__head');
  const bodies = document.querySelectorAll('.questions__body');
  const windowWidth = window.innerWidth;

  const swiper = () => {
    if (windowWidth > 1220) {
      const mySwiper = new Swiper('.about__swiper', {
        enabled: false,
        spaceBetween: 20,
        slidesPerView: 4,
      });
    } else if (windowWidth > 910) {
      const mySwiper = new Swiper('.about__swiper', {
        spaceBetween: 20,
        slidesPerView: 2.5,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    } else {
      const mySwiper = new Swiper('.about__swiper', {
        spaceBetween: 20,
        slidesPerView: 1,
        grabCursor: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  };

  const accordion = () => {
    heads.forEach((e) => {
      e.addEventListener('click', () => {
        bodies.forEach((i) => {
          if (i.style.maxHeight) {
            i.style.maxHeight = null;
            i.style.paddingBottom = '0px';
            i.previousElementSibling.classList.remove('active');
          } else if (e.dataset.tab === i.dataset.tab) {
            i.previousElementSibling.classList.add('active');
            i.style.maxHeight = i.scrollHeight + 20 + 'px';
            i.style.paddingBottom = '20px';
          }
        });
      });
    });
  };

  const animations = () => {
    new WOW().init();
  };
  swiper();
  animations();
  accordion();
});
