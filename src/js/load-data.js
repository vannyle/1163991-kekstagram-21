window.loadData = (onSuccess, onError) => {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  const StatusCode = {
    OK: 200,
  };
  const TIMEOUT_IN_MS = 10000;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(`GET`, URL);
  xhr.send();
};
