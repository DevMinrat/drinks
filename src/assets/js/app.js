document.addEventListener("DOMContentLoaded", () => {
  //= ../../../node_modules/@splidejs/splide/dist/js/splide.js
  //= ../../../node_modules/parallax-js/dist/parallax.js
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

  // intro slider

  const introSliderEl = document.querySelector(".intro-slider");
  const introBg = document.querySelector(".intro-bg");

  const introSlider = new Splide(".splide", {
    type: "fade",
    rewind: true,
    autoplay: true,
    arrows: false,
    resetProgress: !1,
    interval: 5000,
    pagination: false,
    autoHeight: !0,
    pauseOnHover: true,
  }).mount();

  // parallax intro

  const introItem = document.querySelectorAll(".intro-item");

  introItem.forEach((el) => {
    new Parallax(el, {
      selector: ".layer",
    });
  });

  const iSliderNavItems = document.querySelectorAll(".is-nav__item");
  const inc = document.querySelectorAll(".icon-nav-circle");

  function setIntroBg(idx) {
    switch (idx) {
      case 0:
        introBg.classList.add("ibg-chups");
        introBg.classList.remove("ibg-cola", "ibg-fanta", "ibg-pepper");
        break;
      case 1:
        introBg.classList.add("ibg-cola");
        introBg.classList.remove("ibg-chups", "ibg-fanta", "ibg-pepper");
        break;
      case 2:
        introBg.classList.add("ibg-fanta");
        introBg.classList.remove("ibg-cola", "ibg-chups", "ibg-pepper");
        break;
      case 3:
        introBg.classList.add("ibg-pepper");
        introBg.classList.remove("ibg-cola", "ibg-fanta", "ibg-chups");
        break;
      default:
        break;
    }
  }

  function setActiveNavItem(idx) {
    iSliderNavItems.forEach((el) => {
      el.classList.remove("active");
    });
    iSliderNavItems[idx].classList.add("active");
  }

  function animateNavCircleSvg(idx) {
    let currentAnimate = inc[idx].querySelector("animate");
    currentAnimate.beginElement();
  }

  iSliderNavItems.forEach((el, idx) => {
    el.addEventListener("click", (e) => {
      setIntroBg(idx);
      introSlider.go(idx);
      if (!el.classList.contains("active")) {
        animateNavCircleSvg(idx);
      }
    });
  });

  function onInitIntroSlider(idx) {
    setIntroBg(idx);
    setActiveNavItem(idx);
    animateNavCircleSvg(idx);
  }

  onInitIntroSlider(0);

  introSlider.on("moved", function (idx) {
    animateNavCircleSvg(idx);
    setActiveNavItem(idx);
    setIntroBg(idx);
  });

  introSliderEl.addEventListener("mouseenter", () => {
    inc.forEach((el) => {
      el.pauseAnimations();
    });
  });
  introSliderEl.addEventListener("mouseleave", () => {
    inc.forEach((el) => {
      el.unpauseAnimations();
    });
  });

  // popular svg animation

  const pib = document.querySelector("#pop-item-bg");

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

  // parallax benefits

  const benefitsContent = document.querySelector(".benefits-content");

  const benefitsParallax = new Parallax(benefitsContent);
});
