// catalog page filtering

const brandsMobTrigger = document.querySelector(".cp-content__brands-trigger");

if (brandsMobTrigger) {
  const brandsContent = document.querySelector(".cp-filter__brands");
  const brandsMoreBtn = document.querySelector(".cp-content__more-btn");

  brandsMobTrigger.addEventListener("click", (e) => {
    if (window.innerWidth <= 500) {
      brandsMobTrigger.classList.toggle("active");
      brandsContent.classList.toggle("active");
    }
  });

  brandsMoreBtn.addEventListener("click", (e) => {
    brandsContent.classList.toggle("show-more");
    e.target.classList.add("hide");
  });
}

// brands filter

const allProductsCheckbox = document.querySelector("#all");
const productsCheckboxes = document.querySelectorAll(".cb-filter-checkbox");

if (allProductsCheckbox) {
  allProductsCheckbox.addEventListener("click", (e) => {
    console.log(e.target.checked);

    if (allProductsCheckbox.checked) {
      allProductsCheckbox.disabled = true;
    }

    if (allProductsCheckbox.checked) {
      productsCheckboxes.forEach((el) => {
        el.checked = false;
      });
    }

    console.log(e.target.checked);
  });

  productsCheckboxes.forEach((el) => {
    el.addEventListener("change", () => {
      if (el.checked) {
        allProductsCheckbox.checked = false;
        allProductsCheckbox.disabled = false;
      }

      let isproductsChecked = document.querySelectorAll(
        "input.cb-filter-checkbox:checked"
      );

      if (isproductsChecked.length === 0) {
        allProductsCheckbox.checked = true;
      }
    });
  });
}
