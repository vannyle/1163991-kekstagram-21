'use strict';

(() => {
  let initialData = [];
  const filterDefault = document.getElementById(`filter-default`);
  const filterRandom = document.getElementById(`filter-random`);
  const filterDiscussed = document.getElementById(`filter-discussed`);
  const RANDOM_PICTURES_COUNT = 10;
  const ACTIVE_FILTER_CLASS = `img-filters__button--active`;

  const setActiveFilter = (btn) => {
    document.querySelector(`.${ACTIVE_FILTER_CLASS}`).classList.remove(ACTIVE_FILTER_CLASS);
    btn.classList.add(ACTIVE_FILTER_CLASS);
  };

  filterDefault.addEventListener(`click`, () => {
    renderGallery(initialData);
    setActiveFilter(filterDefault);
  });

  filterRandom.addEventListener(`click`, () => {
    const randomPhotoJson = window.utils.getRandomizedArray(initialData).slice(0, RANDOM_PICTURES_COUNT);
    renderGallery(randomPhotoJson);
    setActiveFilter(filterRandom);
  });

  filterDiscussed.addEventListener(`click`, () => {
    const sortedData = window.utils.getSortedCommentArr(initialData);
    renderGallery(sortedData);
    setActiveFilter(filterDiscussed);
  });
  
  // TODO move filters to module

  const renderGallery = (data) => { // data = xhr.response
    // Render pictures and return elements
    const pictures = window.picture.renderPictures(data); // pictures - set of elements

    // Init preview listener
    window.preview.setPreviewHandler(pictures, data);

    // Init Form listener
    window.form.setFormHandler();
  };

  const errorHandler = (errorMessage) => {
    window.utils.createErrorMessage(errorMessage);
  };

  const loadGallery = () => {
    window.load((data) => {
      initialData = data;
      renderGallery(data);
    }, errorHandler);
  };

  // Export
  window.gallery = {
    loadGallery,
  };
})();
