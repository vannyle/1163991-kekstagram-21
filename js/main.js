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

// Variables
const pictures = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const imageUploadControl = document.querySelector(`.img-upload__control`);
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadCancelButton = document.getElementById(`upload-cancel`);
const scaleControlSmaller = imageUploadOverlay.querySelector(`.scale__control--smaller`);
const scaleControlBigger = imageUploadOverlay.querySelector(`.scale__control--bigger`);
const scaleControlValue = imageUploadOverlay.querySelector(`.scale__control--value`);
const uploadPreview = imageUploadOverlay.querySelector(`.img-upload__preview`);

// Functions
const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFromArray = (arr) => arr[getRandom(0, arr.length - 1)];

const generatePhotos = () => new Array(IMAGES_COUNT).fill(``).map((_, idx) => ({
  url: `photos/${idx + 1}.jpg`,
  description: getRandomFromArray(PHOTO_DESCRIPTIONS),
  likes: getRandom(15, 200),
  comment: generateComments(getRandom(1, 20)),
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
openUpload();
imageUploadControl.addEventListener(`click`, openUpload);
uploadCancelButton.addEventListener(`click`, cancelUpload);
uploadCancelButton.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    cancelUpload();
  }
});

// Scale control
let value = 50;
uploadPreview.style.transform = `scale(${value / 100})`;
const setSmallerValue = () => {
  if (value > MIN_VALUE) {
    value -= STEP;
    scaleControlValue.value = `${value}%`;
    uploadPreview.style.transform = `scale(${value / 100})`;
  }
};
const setBiggerValue = () => {
  if (value < MAX_VALUE) {
    value += STEP;
    scaleControlValue.value = `${value}%`;
    uploadPreview.style.transform = `scale(${value / 100})`;
  }
};
scaleControlBigger.addEventListener(`click`, setBiggerValue);
scaleControlSmaller.addEventListener(`click`, setSmallerValue);

// Data
const photos = generatePhotos(IMAGES_COUNT);
// Presentation
pictures.appendChild(createFragment(photos));
