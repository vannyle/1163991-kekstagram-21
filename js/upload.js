'use strict';
(() => {
  const URL = `https://21.javascript.pages.academy/kekstagram/data`;

  window.upload = function (data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
