'use strict';

// Constants
const PHOTO_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, ipsam?`,
  `Lorem ipsum dolor sit amet.`,
  `Lorem ipsum.`,
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  `Cumque, ipsam?`,
  `Lorem ipsum dolor sit amet, consectetur.`,
  `Lorem ipsum dolor sit amet, consectetur adipisicing`,
];
const COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];
const USER_NAMES = [`Артем`, `Иван`, `Петров`, `Наталия`, `София`, `Екатерина`, `Николай`];
const IMAGES_COUNT = 25;
const MIN_VALUE = 25;
const STEP = 25;
const MAX_VALUE = 100;
const EFFECTS = {
  none: {
    prop: `none`,
  },
  chrome: {
    prop: `grayscale`,
    multiplier: 1,
  },
  sepia: {
    prop: `sepia`,
    multiplier: 1,
  },
  marvin: {
    prop: `invert`,
    units: `%`,
    multiplier: 100,
  },
  phobos: {
    prop: `blur`,
    units: `px`,
    multiplier: 3,
  },
  heat: {
    prop: `brightness`,
    multiplier: 3,
  },
};

// Variables
const pictures = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const bigPicture = document.querySelector(`.big-picture`);
const bigPictureCancel = document.querySelector(`.big-picture__cancel`);
const imageUploadControl = document.querySelector(`.img-upload__control`);
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadCancelButton = document.getElementById(`upload-cancel`);
const scaleControlSmaller = imageUploadOverlay.querySelector(`.scale__control--smaller`);
const scaleControlBigger = imageUploadOverlay.querySelector(`.scale__control--bigger`);
const scaleControlValue = imageUploadOverlay.querySelector(`.scale__control--value`);
const uploadPreview = imageUploadOverlay.querySelector(`.img-upload__preview`);
const effectLevel = imageUploadOverlay.querySelector(`.effect-level`);
const effectImages = imageUploadOverlay.querySelector(`.effects`);
const sliderEffectPin = imageUploadOverlay.querySelector(`.effect-level__pin`);
const sliderEffectLine = imageUploadOverlay.querySelector(`.effect-level__line`);
const sliderEffectDepth = imageUploadOverlay.querySelector(`.effect-level__depth`);
const hashtagsInput = imageUploadOverlay.querySelector(`.text__hashtags`);

// Functions
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFromArray = (arr) => arr[getRandom(0, arr.length - 1)];

const generatePhotos = () => new Array(IMAGES_COUNT).fill(``).map((_, idx) => ({
  url: `photos/${idx + 1}.jpg`,
  description: getRandomFromArray(PHOTO_DESCRIPTIONS),
  likes: getRandom(15, 200),
  comment: generateComments(getRandom(1, 6)),
}));

const generateComments = (amount) => new Array(amount).fill(``).map(() => ({
  avatar: `img/avatar-${getRandom(1, 6)}.svg`,
  message: getRandomFromArray(COMMENTS),
  name: getRandomFromArray(USER_NAMES),
}));

const renderPhoto = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = photo.url;
  pictureElement.querySelector(`.picture__likes`).textContent = photo.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = photo.comment.length;
  return pictureElement;
};

const createFragment = (photos) => {
  const fragment = document.createDocumentFragment();
  photos.map(renderPhoto).forEach((photo) => fragment.appendChild(photo));
  return fragment;
};

const renderComments = (comments) => {
  return comments.map((comment) => (`
    <li class="social__comment">
      <img class="social__picture" src=${comment.avatar} alt=${comment.name} width="35" height="35">
      <p class="social__text">${comment.message}</p>
    </li>
  `)).join(`\n`);
};

const renderBigPicture = (picture) => {
  bigPicture.querySelector(`.big-picture__img > img`).src = picture.url;
  bigPicture.querySelector(`.likes-count`).textContent = picture.likes;
  bigPicture.querySelector(`.comments-count`).textContent = picture.comment.length;
  bigPicture.querySelector(`.social__caption`).textContent = picture.description;

  bigPicture.querySelector(`.social__comments`).insertAdjacentHTML(`beforeend`, renderComments(picture.comment));

  bigPicture.classList.remove(`hidden`);
};

// Data
const photos = generatePhotos(IMAGES_COUNT);

// Presentation
pictures.appendChild(createFragment(photos));
Array.from(pictures.querySelectorAll(`.picture`)).forEach((pic, idx) => {
  pic.addEventListener(`click`, () => {
    renderBigPicture(photos[idx]);
  });
});

bigPictureCancel.addEventListener(`click`, () => {
  bigPicture.classList.add(`hidden`);
});

// Open and close upload modal
const onUploadEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    cancelUpload();
  }
};
const openUpload = () => {
  imageUploadOverlay.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, onUploadEscPress);
};
const cancelUpload = () => {
  imageUploadOverlay.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onUploadEscPress);
};
imageUploadControl.addEventListener(`click`, openUpload);
uploadCancelButton.addEventListener(`click`, cancelUpload);
uploadCancelButton.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    cancelUpload();
  }
});

// Scale control
let defaultValue = 50;
uploadPreview.style.transform = `scale(${defaultValue / 100})`;
const setSmallerValue = () => {
  if (defaultValue > MIN_VALUE) {
    defaultValue -= STEP;
    scaleControlValue.value = `${defaultValue}%`;
    uploadPreview.style.transform = `scale(${defaultValue / 100})`;
  }
};
const setBiggerValue = () => {
  if (defaultValue < MAX_VALUE) {
    defaultValue += STEP;
    scaleControlValue.value = `${defaultValue}%`;
    uploadPreview.style.transform = `scale(${defaultValue / 100})`;
  }
};
scaleControlBigger.addEventListener(`click`, setBiggerValue);
scaleControlSmaller.addEventListener(`click`, setSmallerValue);

// Image effects
effectLevel.style.visibility = `hidden`;
let effect = null;
effectImages.addEventListener(`change`, (e) => {
  const target = e.target;
  effect = EFFECTS[target.value];
  if (effect) {
    setEffectValue(1);
    if (effect.prop === `none`) {
      document.querySelector(`.effect-level`).style.visibility = `hidden`;
    } else {
      document.querySelector(`.effect-level`).style.visibility = `visible`;
    }
  }
});

const setEffectValue = (value) => {
  sliderEffectPin.style.left = `${value * 100}%`;
  sliderEffectDepth.style.width = `${value * 100}%`;
  const effectValue = effect.multiplier ? `(${effect.multiplier * value}${effect.units || ``})` : ``;
  uploadPreview.querySelector(`img`).style.filter = effect.prop + effectValue;
};

// Level effect slider
sliderEffectPin.addEventListener(`mousedown`, function (evt) {
  const SLIDER_WIDTH = parseFloat(window.getComputedStyle(sliderEffectLine).width);
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
  };
  let dragged = false;
  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    const shift = {
      x: startCoords.x - moveEvt.clientX,
    };
    startCoords = {
      x: moveEvt.clientX,
    };
    const newCoordsPercent = (sliderEffectPin.offsetLeft - shift.x) / SLIDER_WIDTH;
    if (newCoordsPercent >= 0 && newCoordsPercent <= 1) {
      setEffectValue(newCoordsPercent);
    }
  };
  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    if (dragged) {
      const onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        sliderEffectPin.removeEventListener(`click`, onClickPreventDefault);
      };
      sliderEffectPin.addEventListener(`click`, onClickPreventDefault);
    }
  };
  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

// Hashtags validation

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;
const HASHTAGS_COUNT = 5;

hashtagsInput.addEventListener(`input`, () => {
  const arrayOfHashtags = hashtagsInput.value.split(` `);

  const pattern = /(?:\s|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/;
  arrayOfHashtags.forEach((hashtag) => {
    if (hashtag.length < MIN_NAME_LENGTH) {
      hashtagsInput.setCustomValidity(`Ещё ${(MIN_NAME_LENGTH - hashtag.length)} симв.`);
    } else if (hashtag.length > MAX_NAME_LENGTH) {
      hashtagsInput.setCustomValidity(`Удалите лишние ${(hashtag.length - MAX_NAME_LENGTH)} симв.`);
    } else if (!pattern.test(hashtagsInput.value)) {
      hashtagsInput.setCustomValidity(`Хэштеги начинаются с # не должны содержать символы и пробелы`);
    } else {
      hashtagsInput.setCustomValidity(``);
    }
    if (arrayOfHashtags.length > HASHTAGS_COUNT) {
      hashtagsInput.setCustomValidity(`Не больше пяти хэштегов`);
    }
  });
  hashtagsInput.reportValidity();
  return true;
});

