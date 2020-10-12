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

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `
      z-index: 1;
      margin: 0 auto;
      text-align: center;
      background-color: red;
    `;
    node.style.position = `absolute`;
    node.style.left = `0`;
    node.style.right = `0`;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const loadGallery = function () {
    window.load(renderGallery, errorHandler);
  };

  // Export
  window.gallery = {
    loadGallery,
  };
})();
