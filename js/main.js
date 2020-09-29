'use strict';
//
// Variables
//

const PHOTO_DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, ipsam?`,
  `Lorem ipsum dolor sit amet.`,
  `Lorem ipsum.`,
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  `Cumque, ipsam?`,
  `Lorem ipsum dolor sit amet, consectetur.`,
  `Lorem ipsum dolor sit amet, consectetur adipisicing`,
];

const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];
const USER_NAMES = [`Артем`, `Иван`, `Петров`, `Наталия`, `София`, `Екатерина`, `Николай`];
const IMAGES_COUNT = 25;
const pictures = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

//
// Functions
//

/**
 * Returns random integer in a range
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns random element from given array
 * @param {Array} arr
 * @return {*}
 */
function getRandomFromArray(arr) {
  return arr[getRandom(0, arr.length)];
}

/**
 * Returns shuffled array with unique integers from `min` to `max`
 * @param {number} min
 * @param {number} max
 * @return {[number]}
 */
function getRandomizedArray(min, max) {
  const arr = [];
  for (let i = min; i <= max; i++) {
    arr.push(i);
  }
  // Shuffle array
  return arr.sort(() => Math.random() - 0.5);
}


function generatePicture() {
  const photos = [];
  const shuffledImagesIdx = getRandomizedArray(1, IMAGES_COUNT);

  for (let i = 0; i < IMAGES_COUNT; i++) {
    const comments = generateComments();
    const photo = {
      url: `photos/${shuffledImagesIdx[i]}.jpg`,
      description: getRandomFromArray(PHOTO_DESCRIPTIONS),
      likes: getRandom(15, 200),
      comment: comments.length,
    };
    photos.push(photo);
  }
  return photos;
}

function generateComments() {
  const userComments = [];
  const commentsCount = getRandom(1, 50);
  for (let i = 0; i < commentsCount; i++) {
    const userComment = {
      avatar: `img/avatar-${getRandom(1, 6)}.svg`,
      message: getRandomFromArray(MESSAGES),
      name: getRandomFromArray(USER_NAMES),
    };
    userComments.push(userComment);
  }
  return userComments;
}

function renderPicture(picture) {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = picture.url;
  pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = picture.comment;
  return pictureElement;
}

function createFragment(photos) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
  }
  return fragment;
}

//
// Data
//
const photos = generatePicture();

//
// Presentation
//
pictures.appendChild(createFragment(photos));

