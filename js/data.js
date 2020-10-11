'use strict';

(() => {
  const IMAGES_COUNT = 25;
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

  // export interface
  window.data = {
    generatePhotos,
  };
})();
