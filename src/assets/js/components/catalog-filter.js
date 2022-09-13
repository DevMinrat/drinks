// catalog page filtering

const cpFilterTriggers = document.querySelectorAll(
  ".cp-content__filter-trigger"
);

if (cpFilterTriggers.length > 0) {
  const filterList = document.querySelector(".filter-list__content");
  const fiterCheckboxes = document.querySelectorAll(
    ".cp-filter__modal-item .custom-checkbox"
  );
  const filterReset = document.querySelector(".cp-content__filter-reset");

  cpFilterTriggers.forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("active");
      el.nextElementSibling.classList.toggle("active");
    });
  });

  function showFilterReset() {
    if (document.querySelectorAll(".filter-list__item").length === 0) {
      filterReset.style.display = "none";
    } else {
      filterReset.style.display = "";
    }
  }
  showFilterReset();

  function createFilterItem(name) {
    let filterItem = document.createElement("div");
    filterItem.classList.add("filter-list__item");
    filterItem.dataset.name = name;
    filterItem.innerHTML = ` <p class="filter-list__item-name">${name}</p>
    <svg class="filter-list__item-close">
        <use href="#cross"></use>
    </svg>`;

    filterItem.addEventListener("click", (e) => {
      let target = e.target;

      if (target.classList.contains("filter-list__item-close")) {
        filterItem.remove();
        document.querySelector(`#${name}`).checked = false;
        showFilterReset();
      }
    });

    filterList.append(filterItem);

    showFilterReset();
  }

  function removeFilterItem(name) {
    let item = document.querySelector(`[data-name='${name}']`);

    item.remove();
    showFilterReset();
  }

  fiterCheckboxes.forEach((el) => {
    el.addEventListener("change", () => {
      if (el.checked) {
        createFilterItem(el.value);
      } else {
        removeFilterItem(el.value);
      }
    });
  });

  filterReset.addEventListener("click", () => {
    filterList.innerHTML = "";
    showFilterReset();
  });
}
