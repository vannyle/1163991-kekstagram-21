'use strict';

(() => {
  const imgFilters = document.querySelector(`.img-filters`);
  const filterDefault = document.getElementById(`filter-default`);
  const filterRandom = document.getElementById(`filter-random`);
  const filterDiscussed = document.getElementById(`filter-discussed`);
  const RANDOM_PICTURES_COUNT = 10;
  const ACTIVE_FILTER_CLASS = `img-filters__button--active`;

  imgFilters.classList.remove(`img-filters--inactive`);

  const setActiveFilter = (btn) => {
    document.querySelector(`.${ACTIVE_FILTER_CLASS}`).classList.remove(ACTIVE_FILTER_CLASS);
    btn.classList.add(ACTIVE_FILTER_CLASS);
  };
  const setFiltersHandler = (initialData) => {
    filterDefault.addEventListener(`click`, () => {
      window.gallery.renderGallery(initialData);
      setActiveFilter(filterDefault);
    });

    filterRandom.addEventListener(`click`, () => {
      const randomPhotoJson = window.utils.getRandomizedArray(initialData).slice(0, RANDOM_PICTURES_COUNT);
      window.gallery.renderGallery(randomPhotoJson);
      setActiveFilter(filterRandom);
    });

    filterDiscussed.addEventListener(`click`, () => {
      const sortedData = window.utils.getSortedCommentArr(initialData);
      window.gallery.renderGallery(sortedData);
      setActiveFilter(filterDiscussed);
    });
  };
  window.filters = {
    setFiltersHandler,
  };
})();
