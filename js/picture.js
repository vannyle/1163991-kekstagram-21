'use strict';

(() => {
  const pictures = document.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const renderPhoto = (photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__img`).src = photo.url;
    pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
    return pictureElement;
  };

  const createFragment = (photos) => {
    const fragment = document.createDocumentFragment();
    photos.map(renderPhoto).forEach((photo) => fragment.appendChild(photo));
    return fragment;
  };

  const renderPictures = (photos) => {
    pictures.appendChild(createFragment(photos));
    return pictures;
  };

  // Export
  window.picture = {
    renderPictures,
  };
})();
