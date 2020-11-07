'use strict';

let initialData = [];

const renderAllItems = (data) => { // data = xhr.response
// Init Upload Listener
  window.upload.setDataHandler();

  // Render pictures and return elements
  const pictures = window.picture.renderPictures(data); // pictures - set of elements

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
  window.filters.renderItems();
  // Init Filters listener
  window.filters.setItemsHandler(initialData);
};

const loadAllItems = () => {
  window.loadData((data) => {
    initialData = data;
    renderAllItems(data);

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
  renderAllItems,
  loadAllItems,
};
