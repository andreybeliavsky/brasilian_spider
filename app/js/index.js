document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".swiper-container");

  let mySwiper = new Swiper(slider, {
    loop: true,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const progress = document.querySelectorAll(".progress");

  progress.forEach(function (item) {
    let value = item.dataset.value;
    let scale = item.querySelector(".progress__bar-scale");
    let text = item.querySelector(".progress__value");

    if (scale && text) {
      scale.style.width = value;
      text.innerHTML = value;
    }
  });
});
