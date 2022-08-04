document.addEventListener('DOMContentLoaded', () => {
  const heads = document.querySelectorAll('.questions__head');
  const bodies = document.querySelectorAll('.questions__body');
  const menuLinks = document.querySelectorAll('[data-goto]');
  const popupOpenBtns = document.querySelectorAll('[data-open-pop]');
  const body = document.querySelector('.page');
  const popups = document.querySelectorAll('[data-pop]');
  const popupBgs = document.querySelectorAll('.popup__bg');
  const html = document.querySelector('html');

  const swiper = () => {
    const windowWidth = document.documentElement.clientWidth;
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

  const navigation = () => {
    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener('click', (e) => {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue =
          gotoBlock.getBoundingClientRect().top + pageYOffset - 50;
        window.scrollTo({
          top: gotoBlockValue,
          behavior: 'smooth',
        });
        e.preventDefault();
      });
    });
  };

  const openPopup = () => {
    popupOpenBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        html.classList.add('lock');
        popups.forEach((popup) => {
          if (popup.dataset.pop == e.target.dataset.openPop) {
            popup.classList.add('active');
          }
        });
        e.preventDefault();
      });
    });
    popupBgs.forEach((bg) => {
      bg.addEventListener('click', (e) => {
        html.classList.remove('lock');
        let pop = document.querySelector(
          `[data-pop="${e.target.dataset.close}"]`
        );
        pop.classList.remove('active');
      });
    });
    document.querySelectorAll('[data-close]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        let pop = document.querySelector(
          `[data-pop="${e.target.dataset.close}"]`
        );
        pop.classList.remove('active');
        html.classList.remove('lock');
      });
    });
  };

  const animations = () => {
    new WOW().init();
  };
  swiper();
  animations();
  accordion();
  navigation();
  openPopup();
});
