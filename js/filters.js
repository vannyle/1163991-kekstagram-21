'use strict';

(() => {
  window.filters = () => {
    const imgFilters = document.querySelector(`.img-filters`);
    imgFilters.classList.remove(`img-filters--inactive`);
  };
})();
