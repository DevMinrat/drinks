document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  //= ../../../node_modules/@splidejs/splide/dist/js/splide.js
  //= ../../../node_modules/parallax-js/dist/parallax.js
  //= components/lightgallery.js

  const header = document.querySelector(".header");
  let scrollPrev = 0;

  window.addEventListener("scroll", () => {
    let scrolled = document.documentElement.scrollTop;

    if (scrolled > 50 && scrolled > scrollPrev) {
      header.classList.add("out");
    } else {
      header.classList.remove("out");
    }

    if (scrolled <= 50) {
      header.classList.add("top");
    } else {
      header.classList.remove("top");
    }

    scrollPrev = scrolled;
  });

  if (document.documentElement.scrollTop <= 50) {
    header.classList.add("top");
  }

  // intro slider

  const introSliderEl = document.querySelector(".intro-slider");
  const introBg = document.querySelector(".intro-bg");

  // parallax intro

  if (introSliderEl) {
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
  }

  // popular svg animation

  const pib = document.querySelector("#pop-item-bg");
  const popularItems = document.querySelectorAll(".mproduct-item");

  if (popularItems.length > 0) {
    function animatePopBubbleSvg() {
      let animatedEl = pib.querySelectorAll("animate");
      let animatedElTr = pib.querySelector("animateTransform");
      animatedElTr.beginElement();
      for (let i = 0; i < animatedEl.length; i++) {
        animatedEl[i].beginElement();
      }
    }

    popularItems.forEach((el) => {
      el.addEventListener("mouseenter", (e) => {
        animatePopBubbleSvg();
      });
    });
  }

  // popular parallax bg

  let popularMain = document.querySelector(".popular");

  if (popularMain) {
    let startPosPopBg = -300;

    ScrollTrigger.create({
      trigger: ".popular",
      start: "top bottom",
      endTrigger: ".weworks",
      end: "top center",
      onUpdate: (self) => {
        let factor = 300;
        self.trigger.style.backgroundPosition = `right top ${
          startPosPopBg + factor * self.progress.toFixed(2)
        }px`;
      },
    });
  }

  // parallax benefits

  const benefitsContent = document.querySelector(".benefits-content");

  // clients animation

  if (benefitsContent) {
    const benefitsParallax = new Parallax(benefitsContent);

    const clientsTopFT = gsap.fromTo(
      ".clients-top",
      {
        x: -1340,
      },
      {
        x: 0,
        ease: "none",
      }
    );
    const clientsBottomFT = gsap.fromTo(
      ".clients-bottom",
      {
        x: 0,
      },
      {
        x: -1340,
        ease: "none",
      }
    );
    let clientsTopST = ScrollTrigger.create({
      trigger: ".clients",
      start: "200 bottom",
      end: "bottom top",
      scrub: 1.5,
      animation: clientsTopFT,
    });
    let clientsBottomST2 = ScrollTrigger.create({
      trigger: ".clients",
      start: "200 bottom",
      end: "bottom top",
      scrub: 1.5,
      animation: clientsBottomFT,
    });
  }

  // animate fruits and berries

  const animFruits = document.querySelectorAll(".anim-fruit");

  if (animFruits.length > 0) {
  }

  //= components/catalog-filter.js

  // tabs

  class ItcTabs {
    constructor(target, config) {
      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs =
        typeof target === "string" ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll(".tabs-btn");
      this._elPanes = this._elTabs.querySelectorAll(".tabs-pane");
      this._eventShow = new Event("tab.itc.change");
      this._init();
      this._events();
    }
    _init() {
      this._elTabs.setAttribute("role", "tablist");
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute("role", "tab");
        this._elPanes[index].setAttribute("role", "tabpanel");
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector(".tabs-btn_active");
      const elPaneShow = this._elTabs.querySelector(".tabs-pane_show");
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove("tabs-btn_active") : null;
      elPaneShow ? elPaneShow.classList.remove("tabs-pane_show") : null;
      elLinkTarget.classList.add("tabs-btn_active");
      elPaneTarget.classList.add("tabs-pane_show");
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    }
    _events() {
      this._elTabs.addEventListener("click", (e) => {
        const target = e.target.closest(".tabs-btn");
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }
  }

  if (document.querySelector(".product-info")) {
    new ItcTabs(".product-info");
  }

  const certificatesWrapper = document.querySelector(".certificates-wrapper");

  if (certificatesWrapper) {
    lightGallery(certificatesWrapper, {
      loop: false,
    });
  }
});
