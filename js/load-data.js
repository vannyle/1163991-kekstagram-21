'use strict';

const DATA_URL = `https://21.javascript.pages.academy/kekstagram/data`;
const TIMEOUT_IN_MS = 10000;

window.loadData = (onSuccess, onError) => {
  const xhr = window.utils.createXHR(onSuccess, onError);
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(`GET`, DATA_URL);
  xhr.send();
};
