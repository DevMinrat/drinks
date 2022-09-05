document.addEventListener("DOMContentLoaded", () => {
  //= ../../../node_modules/@splidejs/splide/dist/js/splide.js
  //= components/

  const header = document.querySelector(".header");
  let scrollPrev = 0;

  window.addEventListener("scroll", () => {
    let scrolled = document.documentElement.scrollTop;

    if (scrolled > 50 && scrolled > scrollPrev) {
      header.classList.add("out");
    } else {
      header.classList.remove("out");
    }

    if (scrolled <= 20) {
      header.classList.add("top");
    } else {
      header.classList.remove("top");
    }

    scrollPrev = scrolled;
  });

  if (document.documentElement.scrollTop <= 20) {
    header.classList.add("top");
  }

  new Splide(".splide", {
    type: "fade",
    rewind: true,
    autoplay: true,
    arrows: false,
    resetProgress: !1,
    interval: 2000,
    pagination: false,
    autoHeight: !0,
  }).mount();

  let pib = document.querySelector("#pop-item-bg");

  function animatePopBubbleSvg() {
    let animatedEl = pib.querySelectorAll("animate");
    let animatedElTr = pib.querySelector("animateTransform");
    animatedElTr.beginElement();
    for (let i = 0; i < animatedEl.length; i++) {
      animatedEl[i].beginElement();
    }
  }

  const popularItems = document.querySelectorAll(".popular-item");

  popularItems.forEach((el) => {
    el.addEventListener("mouseenter", (e) => {
      animatePopBubbleSvg();
    });
  });
});
