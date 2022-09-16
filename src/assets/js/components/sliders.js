if (document.querySelector(".weworks")) {
  var weworksSlider = new Splide(".weworks", {
    arrows: false,
    width: "100%",
    perPage: 2,
    gap: "1rem",

    drag: "free",
    snap: true,
    flickPower: 200,

    mediaQuery: "min",
    breakpoints: {
      921: {
        destroy: true,
      },
      501: {
        perPage: 2,
      },
      10: {
        perPage: 1,
      },
    },
  }).mount();
}

if (document.querySelector(".catalog-main__slider")) {
  var weworksSlider = new Splide(".catalog-main__slider", {
    arrows: false,
    pagination: false,
    gap: "1.6rem",

    drag: "free",
    snap: true,
    flickPower: 100,

    mediaQuery: "min",
    breakpoints: {
      921: {
        destroy: true,
      },
      501: {
        perPage: 2,
        fixedWidth: null,
      },
      10: {
        fixedWidth: "27rem",
      },
    },
  }).mount();
}

if (document.querySelector(".certificates")) {
  var weworksSlider = new Splide(".certificates", {
    arrows: false,
    pagination: false,
    gap: "1.2rem",

    drag: "free",
    snap: true,
    flickPower: 100,

    mediaQuery: "min",
    breakpoints: {
      921: {
        destroy: true,
      },
      501: {
        perPage: 2,
        fixedWidth: null,
      },
      10: {
        fixedWidth: "15.6rem",
      },
    },
  }).mount();
}
