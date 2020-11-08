'use strict';

let initialData = [];

const render = (data) => { // data = xhr.response
// Init Upload Listener
  window.upload.getDataHandler();

  // Render pictures and return elements
  const pictures = window.picture.render(data); // pictures - set of elements

  // Init Preview listener
  window.preview.setBigPictureHandler(pictures, data);

  // Init Form listener
  window.form.setModalHandler();
};

const errorHandler = (errorMessage) => {
  window.utils.createErrorMessage(errorMessage);
};

const enableFiltersHandler = () => {
  // Render filters
  window.filters.render();
  // Init Filters listener
  window.filters.setItemsHandler(initialData);
};

const loadItems = () => {
  window.loadData((data) => {
    initialData = data;
    render(data);

    if (document.readyState === `complete`) {
      enableFiltersHandler();
    } else {
      // Waiting for pictures to be loaded and then show filters
      window.addEventListener(`load`, enableFiltersHandler);
    }

  }, errorHandler);
};

// Export
window.gallery = {
  render,
  loadItems,
};
