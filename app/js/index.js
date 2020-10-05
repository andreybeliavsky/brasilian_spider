document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.swiper-container');

  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(slider, {
    loop: true,
    // effect: 'fade',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const progress = document.querySelectorAll('.progress');

  progress.forEach((item) => {
    const { value } = item.dataset;
    const scale = item.querySelector('.progress__bar-scale');
    const text = item.querySelector('.progress__value');

    if (scale && text) {
      scale.style.width = value;
      text.innerHTML = value;
    }
  });
});
