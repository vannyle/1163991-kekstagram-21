let initialData = [];

const renderGallery = (data) => { // data = xhr.response
// Init Upload Listener
  window.upload.setUploadHandler();

  // Render pictures and return elements
  const pictures = window.picture.renderPictures(data); // pictures - set of elements

  // Init Preview listener
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
    // Waiting for pictures to be loaded and then show filters
    window.addEventListener(`load`, () => {
      // Render filters
      window.filters.renderFilters();
      // Init Filters listener
      window.filters.setFiltersHandler(initialData);
    });
  }, errorHandler);
};

// Export
window.gallery = {
  renderGallery,
  loadGallery,
};
