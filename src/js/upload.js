
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadPreview = imageUploadOverlay.querySelector(`.img-upload__preview`);
const fileChooser = document.getElementById(`upload-file`);
const uploadPreviewImage = uploadPreview.querySelector(`img`);

// Upload image
const getUploadImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (ending) {
    return fileName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      uploadPreviewImage.src = reader.result;
    });
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
