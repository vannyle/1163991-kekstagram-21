'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const UPLOAD_URL = `https://21.javascript.pages.academy/kekstagram`;

const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadPreview = imageUploadOverlay.querySelector(`.img-upload__preview`);
const fileChooser = document.querySelector(`#upload-file`);
const uploadPreviewImage = uploadPreview.querySelector(`img`);
const effectPreview = imageUploadOverlay.querySelectorAll(`.effects__preview`);

// Upload image
const getUploadImageHandler = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (ending) {
    return fileName.endsWith(ending);
  });

  const reader = new FileReader();
  const readerLoadHandler = () => {
    uploadPreviewImage.src = reader.result;
    effectPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${reader.result})`;
    });
  };
  if (matches) {
    reader.addEventListener(`load`, readerLoadHandler);
    reader.readAsDataURL(file);
    window.form.openUploadModal();
  }
};

const cleanFile = () => {
  fileChooser.value = ``;
};

const setData = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === window.utils.STATUS_CODE.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError();
  });

  xhr.open(`POST`, UPLOAD_URL);
  xhr.send(data);
};

const setDataHandler = () => {
  fileChooser.addEventListener(`change`, getUploadImageHandler);
};

window.upload = {
  setDataHandler,
  setData,
  cleanFile,
};
