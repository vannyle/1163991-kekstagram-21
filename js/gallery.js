'use strict';

(() => {
  const renderGallery = (photos) => {
    // Render pictures and return elements
    const pictures = window.picture.renderPictures(photos);

    // Init preview listener
    window.preview.setPreviewHandler(pictures, photos);

    // Init Form listener
    window.form.setFormHandler();
  };

  // Export
  window.gallery = {
    renderGallery,
  };
})();
