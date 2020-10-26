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

const renderComments = (comments, numShowComments = 5) => {
  const showComments = comments.slice(0, numShowComments);
  return showComments.map((comment) => (`
    <li class="social__comment">
      <img class="social__picture" src=${comment.avatar} alt=${comment.name} width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>
  `)).join(`\n`);
};

const setPreviewHandler = (pictures, photos) => {
  const onUploadEscPress = (evt) => {
    if (evt.key === `Escape`) {
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
      renderBigPicture(photos[idx]);
      document.addEventListener(`keydown`, onUploadEscPress);
    });
  });
  bigPictureCancel.addEventListener(`click`, cancelBigPicture);
};

window.preview = {
  setPreviewHandler,
};
