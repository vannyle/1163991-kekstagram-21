'use strict';
//
// Variables
//
const arrNumberUrl = getRandom(1, 25);
const arrNumberLikes = getRandom(15, 200);
const arrNumberUsers = getRandom(1, 6);
const pictureDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, ipsam?`,
  `Lorem ipsum dolor sit amet.`,
  `Lorem ipsum.`,
  `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
  `Cumque, ipsam?`,
  `Lorem ipsum dolor sit amet, consectetur.`,
  `Lorem ipsum dolor sit amet, consectetur adipisicing`,
];

const users = {
  avatars: arrNumberUsers,
  messages: [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
  ],
  names: [`Артем`, `Иван`, `Петров`, `Наталия`, `София`, `Екатерина`, `Николай`],
};

const pictures = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

//
// Functions
//
function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandom(min, max) {
  const randomNumbers = [];
  for (let i = min; i <= max; i++) {
    const temp = Math.floor(Math.random() * (1 + max - min)) + min;
    if (randomNumbers.indexOf(temp) === -1) {
      randomNumbers.push(temp);
    } else {
      i--;
    }
  }
  return randomNumbers;
}

function generateComments() {
  const userComments = [];
  for (let i = 0; i < getRandomFrom(arrNumberUsers); i++) {
    const userComment = {
      avatar: `img/avatar-${getRandomFrom(users.avatars)}.svg`,
      message: getRandomFrom(users.messages),
      name: getRandomFrom(users.names),
    };
    userComments.push(userComment);
  }
  return userComments;
}

function generatePicture() {
  const photos = [];
  for (let i = 0; i < arrNumberUrl.length; i++) {
    const comments = generateComments();
    const photo = {
      url: `photos/${arrNumberUrl[i]}.jpg`,
      description: getRandomFrom(pictureDescription),
      likes: arrNumberLikes[i],
      comment: comments.length,
    };
    photos.push(photo);
  }
  return photos;
}

function renderPicture(picture) {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector(`.picture__img`).src = picture.url;
  pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = picture.comment;
  return pictureElement;
}

function createFragment() {
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
pictures.appendChild(createFragment());

