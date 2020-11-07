'use strict';

const bigPicture = document.querySelector(`.big-picture`);
const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
const moreComments = bigPicture.querySelector(`.comments-loader`);

let commentsLimit = 5;
const COMMENTS_STEP = 5;

const renderBigPicture = (picture) => {
  // Reset "more-comments" button
  commentsLimit = 5;
  moreComments.style.visibility = `visible`;
  bigPicture.querySelector(`.big-picture__img > img`).src = picture.url;
  bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
  bigPicture.querySelector(`.comments-count`).textContent = picture.comments.length.toString();
  bigPicture.querySelector(`.social__caption`).textContent = picture.description;
  bigPicture.querySelector(`.social__comments`).innerHTML = renderComments(picture.comments);
  bigPicture.classList.remove(`hidden`);
};

const renderComment = (comment) => `
    <li class="social__comment">
      <img class="social__picture" src=${comment.avatar} alt=${comment.name} width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>
  `;


const renderComments = (comments) => {
  const showComments = comments.slice(0, commentsLimit);
  bigPicture.querySelector(`.comments-counter`).textContent = showComments.length;
  return showComments.map((comment) => renderComment(comment)).join(``);
};

const setPreviewHandler = (pictures, photos) => {
  let currentPicture = null;

  const onUploadEscPress = (evt) => {
    if (window.utils.isEsc(evt.key)) {
      evt.preventDefault();
      cancelBigPicture();
    }
  };
  const cancelBigPicture = () => {
    bigPicture.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onUploadEscPress);
  };
  // Set handler for preview
  Array.from(pictures.querySelectorAll(`.picture`)).forEach((pic, idx) => {
    pic.addEventListener(`click`, () => {
      currentPicture = photos[idx];
      renderBigPicture(currentPicture);
      document.addEventListener(`keydown`, onUploadEscPress);
    });
  });
  bigPictureCancel.addEventListener(`click`, cancelBigPicture);

  moreComments.addEventListener(`click`, () => {
    if (currentPicture) {
      commentsLimit += COMMENTS_STEP;
      bigPicture.querySelector(`.social__comments`).innerHTML = renderComments(currentPicture.comments);

      if (currentPicture.comments.length <= commentsLimit) {
        moreComments.style.visibility = `hidden`;
      }
    }
  });
};

window.preview = {
  setPreviewHandler,
};
