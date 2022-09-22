//= ../../../node_modules/@splidejs/splide/dist/js/splide.js
//= ../../../node_modules/parallax-js/dist/parallax.js
//= components/lightgallery.js
//= components/scroll-lock.js

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const gsapMM = gsap.matchMedia();

  //= components/sliders.js

  const header = document.querySelector(".header");
  let scrollPrev = 0;

  if (header) {
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

    const burger = document.querySelector(".burger-menu");
    const menu = document.querySelector(".menu");
    const dropLinks = document.querySelectorAll(
      ".nav-list__item-link--droplink"
    );
    const dropList = document.querySelectorAll(".nav-list__droplink-list");

    burger.addEventListener("click", () => {
      burger.classList.toggle("menu-on");
      menu.classList.toggle("active");

      if (burger.classList.contains("menu-on")) {
        scrollLock.disablePageScroll();
      } else {
        scrollLock.enablePageScroll();
      }
    });

    if (window.innerWidth <= 991) {
      for (let i = 0; i < dropLinks.length; i++) {
        dropLinks[i].addEventListener("click", function (e) {
          toggleDroplinksStyle(i);
          showDroplistContent(e, i);
        });
      }
    }

    function toggleDroplinksStyle(i) {
      dropLinks.forEach((el, inx, arr) => {
        if (el === arr[i]) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
    }

    function hideAllDropList() {
      dropList.forEach((item) => {
        item.style.maxHeight = null;
      });
    }

    function showDroplistContent(event, i) {
      if (!dropList[i].style.maxHeight) {
        event.preventDefault();
        hideAllDropList();
        dropList[i].style.maxHeight = dropList[i].scrollHeight + "px";
      } else {
        event.stopPropagation();
        hideAllDropList();
      }
    }
  }

  // intro slider

  const introSliderEl = document.querySelector(".intro-slider");
  const introBg = document.querySelector(".intro-bg");

  // parallax intro

  if (introSliderEl) {
    const introSlider = new Splide(".intro-slider", {
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

    gsapMM.add("(min-width: 501px)", () => {
      popularItems.forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
          animatePopBubbleSvg();
        });
      });
    });
  }

  // popular parallax bg

  let popularMain = document.querySelector(".popular");

  if (popularMain) {
    let startPosPopBg = -300;

    gsapMM.add("(min-width: 921px)", () => {
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
    });
  }

  // parallax benefits

  const benefitsContent = document.querySelector(".benefits-content");
  const clients = document.querySelector(".clients");

  // clients animation

  if (benefitsContent) {
    const benefitsParallax = new Parallax(benefitsContent);
  }

  if (clients) {
    let imgsLineWidth = document.querySelector(".clients-top").scrollWidth;
    let scrollingVar = document.documentElement.clientWidth - imgsLineWidth;

    const clientsTopFT = gsap.fromTo(
      ".clients-top",
      {
        x: scrollingVar,
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
        x: scrollingVar,
        ease: "none",
      }
    );
    let clientsTopST = ScrollTrigger.create({
      trigger: ".clients",
      start: "100 bottom",
      end: "bottom top",
      scrub: 1.5,
      animation: clientsTopFT,
    });
    let clientsBottomST2 = ScrollTrigger.create({
      trigger: ".clients",
      start: "100 bottom",
      end: "bottom top",
      scrub: 1.5,
      animation: clientsBottomFT,
    });
  }

  // animate fruits and berries

  const animFruits = document.querySelectorAll(".anim-fruit");

  if (animFruits.length > 0) {
    function animateFrom(elem, direction) {
      direction = direction || 1;

      switch (direction) {
        case -1:
          elem.classList.add("from-bottom");
          elem.classList.remove("from-top");
          break;
        case 1:
          elem.classList.add("from-bottom");
          elem.classList.remove("from-top");
          break;
        case 2:
          elem.classList.remove("from-bottom");
          elem.classList.add("from-top");
          break;
        case 3:
          elem.classList.remove("from-bottom");
          elem.classList.remove("from-top");
          break;

        default:
          break;
      }
    }

    gsapMM.add("(min-width: 921px)", () => {
      animFruits.forEach((elem) => {
        ScrollTrigger.create({
          trigger: elem,
          end: "top-=300 top",
          onEnter: function () {
            animateFrom(elem);
          },
          onEnterBack: function () {
            animateFrom(elem, -1);
          },
          onLeave: function () {
            animateFrom(elem, 2);
          },
          onLeaveBack: () => {
            animateFrom(elem, 3);
          },
        });
      });
    });
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

  const contactsForm = document.querySelector(".contacts-form");

  if (contactsForm) {
    const choices = new Choices(
      document.getElementById("contacts-form__select"),
      { searchEnabled: false, itemSelectText: "" }
    );
  }

  if (document.querySelector(".about-trust")) {
    let imgsLineWidth = document.querySelector(".about-trust__top").scrollWidth;
    let scrollingVar = document.documentElement.clientWidth - imgsLineWidth;
    gsapMM.add("(max-width: 920px)", () => {
      const aboutTrustTopFT = gsap.fromTo(
        ".about-trust__top",
        {
          x: scrollingVar,
        },
        {
          x: 0,
          ease: "none",
        }
      );
      const aboutTrustBottomFT = gsap.fromTo(
        ".about-trust__bottom",
        {
          x: 0,
        },
        {
          x: scrollingVar,
          ease: "none",
        }
      );
      let clientsTopST = ScrollTrigger.create({
        trigger: ".about-trust__inner",
        start: "100 bottom",
        end: "bottom top",
        scrub: 1.5,
        animation: aboutTrustTopFT,
      });
      let clientsBottomST2 = ScrollTrigger.create({
        trigger: ".about-trust__inner",
        start: "100 bottom",
        end: "bottom top",
        scrub: 1.5,
        animation: aboutTrustBottomFT,
      });
    });
  }

  // modal functional

  const modalTriggers = document.querySelectorAll("[data-modal]");

  if (modalTriggers.length > 0) {
    modalTriggers.forEach((el) => {
      el.addEventListener("click", () => {
        let modalName = el.dataset.modal;
        let modal = document.querySelector(`[data-name='${modalName}']`);

        modal.classList.remove("hide");
      });
    });
  }

  const modals = document.querySelectorAll(".modal");

  if (modals.length > 0) {
    modals.forEach((el) => {
      el.querySelector("[data-close]").addEventListener("click", () => {
        el.classList.add("hide");
      });
    });
  }
});
