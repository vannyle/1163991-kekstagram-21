let initialData = [];

const renderGallery = (data) => { // data = xhr.response
  // Render pictures and return elements
  const pictures = window.picture.renderPictures(data); // pictures - set of elements

  // Init Preview listener
  window.preview.setPreviewHandler(pictures, data);

  // Init Form listener
  window.form.setFormHandler();

  // Init Filters listener
  window.filters.setFiltersHandler(initialData);
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
  renderGallery,
  loadGallery,
};
