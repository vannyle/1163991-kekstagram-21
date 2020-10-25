const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadPreview = imageUploadOverlay.querySelector(`.img-upload__preview`);
const fileChooser = document.getElementById(`upload-file`);
const uploadPreviewImage = uploadPreview.querySelector(`img`);
const effectPreview = imageUploadOverlay.querySelectorAll(`.effects__preview`);

// Upload image
const getUploadImage = () => {
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
    window.form.openUpload();
  }
};

const URL = `https://21.javascript.pages.academy/kekstagram`;
const setUpload = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  const StatusCode = {
    OK: 200,
  };
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError();
  });

  xhr.open(`POST`, URL);
  xhr.send(data);
};

const setUploadHandler = () => {
  fileChooser.addEventListener(`change`, getUploadImage);
};

window.upload = {
  setUploadHandler,
  setUpload,
};
