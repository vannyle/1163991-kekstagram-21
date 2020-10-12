'use strict';

(() => {
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
  const renderBigPicture = (picture) => {
    bigPicture.querySelector(`.big-picture__img > img`).src = picture.url;
    bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
    bigPicture.querySelector(`.comments-count`).textContent = picture.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = picture.description;
    bigPicture.querySelector(`.social__comments`).innerHTML = renderComments(picture.comments);
    bigPicture.classList.remove(`hidden`);
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (`
    <li class="social__comment">
      <img class="social__picture" src=${comment.avatar} alt=${comment.name} width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>
  `)).join(`\n`);
  };

  const setPreviewHandler = (pictures, photos) => {
    // Set handler for preview
    Array.from(pictures.querySelectorAll(`.picture`)).forEach((pic, idx) => {
      pic.addEventListener(`click`, () => {
        renderBigPicture(photos[idx]);
      });
    });
    bigPictureCancel.addEventListener(`click`, () => {
      bigPicture.classList.add(`hidden`);
    });
  };

  window.preview = {
    setPreviewHandler,
  };
})();
