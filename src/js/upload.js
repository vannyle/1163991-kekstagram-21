
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadPreview = imageUploadOverlay.querySelector(`.img-upload__preview`);
const fileChooser = document.getElementById(`upload-file`);
const uploadPreviewImage = uploadPreview.querySelector(`img`);

const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`);
const successMessage = document.querySelector(`#success`).content.querySelector(`.success`);

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
  };
  const renderErrorHandler = () => {
    document.querySelector(`body`).appendChild(errorMessage);
  };
  if (matches) {
    reader.addEventListener(`load`, readerLoadHandler);
    reader.addEventListener(`error`, renderErrorHandler);
    reader.readAsDataURL(file);
    window.form.openUpload();
  }
};

const setUploadHandler = () => {
  fileChooser.addEventListener(`change`, getUploadImage);
};

window.upload = {
  setUploadHandler,
};
