'use strict';

// Constants
const MIN_VALUE = 25;
const STEP = 25;
const MAX_VALUE = 100;
const MIN_HASHTAGS_LENGTH = 2;
const MAX_HASHTAGS_LENGTH = 20;
const HASHTAGS_COUNT = 5;
const MAX_MESSAGE_SYMBOLS = 140;

const EFFECTS = {
  none: {
    prop: `none`,
  },
  chrome: {
    prop: `grayscale`,
    multiplier: 1,
  },
  sepia: {
    prop: `sepia`,
    multiplier: 1,
  },
  marvin: {
    prop: `invert`,
    units: `%`,
    multiplier: 100,
  },
  phobos: {
    prop: `blur`,
    units: `px`,
    multiplier: 3,
  },
  heat: {
    prop: `brightness`,
    multiplier: 3,
  },
};

// Selectors
const imageUploadForm = document.querySelector(`.img-upload__form`);
const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
const uploadPreview = imageUploadOverlay.querySelector(`.img-upload__preview`);
const uploadPreviewImage = uploadPreview.querySelector(`img`);

const uploadCancelButton = document.querySelector(`#upload-cancel`);
const scaleControlSmaller = imageUploadOverlay.querySelector(`.scale__control--smaller`);
const scaleControlBigger = imageUploadOverlay.querySelector(`.scale__control--bigger`);
const scaleControlValue = imageUploadOverlay.querySelector(`.scale__control--value`);

const effectLevel = imageUploadOverlay.querySelector(`.effect-level`);
const effectImages = imageUploadOverlay.querySelector(`.effects`);
const sliderEffectPin = imageUploadOverlay.querySelector(`.effect-level__pin`);
const sliderEffectLine = imageUploadOverlay.querySelector(`.effect-level__line`);
const sliderEffectDepth = imageUploadOverlay.querySelector(`.effect-level__depth`);
const sliderEffectValue = imageUploadOverlay.querySelector(`.effect-level__value`);

const hashtagsInput = imageUploadOverlay.querySelector(`.text__hashtags`);
const textDescription = imageUploadOverlay.querySelector(`.text__description`);

const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`);
const successMessage = document.querySelector(`#success`).content.querySelector(`.success`);

let scaleValue = 100;
let effect = null;

// Open and close upload modal
const onUploadEscPress = (evt) => {
  if (window.utils.isEsc(evt.key)) {
    evt.preventDefault();
    cancelUploadModal();
  }
};
const openUploadModal = () => {
  imageUploadOverlay.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, onUploadEscPress);
};
const cancelUploadModal = () => {
  if (document.activeElement !== hashtagsInput && document.activeElement !== textDescription) {
    imageUploadOverlay.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onUploadEscPress);

    window.upload.cleanFile();
    hashtagsInput.value = ``;
    textDescription.value = ``;
  }

  // Reset to defaults
  resetToDefaults();
};

const resetToDefaults = () => {
  effect = null;
  scaleValue = 100;
  effectImages.querySelector(`:checked`).checked = false;
  effectImages.querySelector(`#effect-none`).checked = true;
  effectLevel.style.visibility = `hidden`;

  setImageEffects(effect);
  setEffectValue(1);
  updateScale();
};

// Scale control
const setSmallerValueHandler = () => {
  if (scaleValue > MIN_VALUE) {
    scaleValue -= STEP;
    updateScale();
  }
};
const setBiggerValueHandler = () => {
  if (scaleValue < MAX_VALUE) {
    scaleValue += STEP;
    updateScale();
  }
};
const updateScale = () => {
  scaleControlValue.value = `${scaleValue}%`;
  scaleControlValue.setAttribute(`value`, `${scaleValue}%`);
  uploadPreview.style.transform = `scale(${scaleValue / 100})`;
};

// Image effects
const setEffectValue = (value) => {
  const absoluteValue = value * 100;
  sliderEffectPin.style.left = `${absoluteValue}%`;
  sliderEffectDepth.style.width = `${absoluteValue}%`;
  if (effect) {
    const effectValue = effect.multiplier ? `(${effect.multiplier * value}${effect.units || ``})` : ``;
    uploadPreviewImage.style.filter = effect.prop + effectValue;
    sliderEffectValue.setAttribute(`value`, `${Math.round(absoluteValue)}`);
  }
};

const changeImageEffectHandler = (e) => {
  const target = e.target;
  effect = EFFECTS[target.value];
  setImageEffects(effect);
};

const setImageEffects = (effectObj) => {
  if (effectObj) {
    setEffectValue(1);
    if (effectObj.prop === `none`) {
      document.querySelector(`.effect-level`).style.visibility = `hidden`;
    } else {
      document.querySelector(`.effect-level`).style.visibility = `visible`;
    }
  } else {
    uploadPreviewImage.style.filter = `none`;
  }
};

// Level effect slider
const setLevelEffectSliderHandler = (evt) => {
  const SLIDER_WIDTH = parseFloat(window.getComputedStyle(sliderEffectLine).width);
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
  };
  let dragged = false;
  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    const shift = {
      x: startCoords.x - moveEvt.clientX,
    };
    startCoords = {
      x: moveEvt.clientX,
    };
    const newCoordsPercent = (sliderEffectPin.offsetLeft - shift.x) / SLIDER_WIDTH;
    if (newCoordsPercent >= 0 && newCoordsPercent <= 1) {
      setEffectValue(newCoordsPercent);
    }
  };
  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    if (dragged) {
      const onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        sliderEffectPin.removeEventListener(`click`, onClickPreventDefault);
      };
      sliderEffectPin.addEventListener(`click`, onClickPreventDefault);
    }
  };
  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

// Hashtags validation
const setHashtagValidation = () => {
  const arrayOfHashtags = hashtagsInput.value.split(` `).filter(Boolean);
  const pattern = /(?:\s|^)#[0-9A-Za-zА-Яа-яё]+(?:\s|$)/;

  const hashTags = new Set();
  hashtagsInput.setCustomValidity(``);

  arrayOfHashtags.forEach((hashtag) => {
    const len = hashtag.length;
    if (len < MIN_HASHTAGS_LENGTH) {
      hashtagsInput.setCustomValidity(`Ещё ${(MIN_HASHTAGS_LENGTH - len)} симв.`);
    } else if (len > MAX_HASHTAGS_LENGTH) {
      hashtagsInput.setCustomValidity(`Удалите лишние ${(len - MAX_HASHTAGS_LENGTH)} симв.`);
    } else if (!pattern.test(hashtag)) {
      hashtagsInput.setCustomValidity(`Хэштеги начинаются с # и не должны содержать символы, пробелы.`);
    } else if (hashTags.has(hashtag.toLowerCase())) {
      hashtagsInput.setCustomValidity(`Хэштеги не должны повторяться.`);
    }
    hashTags.add(hashtag.toLowerCase());
  });
  if (arrayOfHashtags.length > HASHTAGS_COUNT) {
    hashtagsInput.setCustomValidity(`Не больше пяти хэштегов`);
  }

  if (!hashtagsInput.validity.valid) {
    hashtagsInput.style.outlineColor = `red`;
  } else {
    hashtagsInput.style.outlineColor = `#4D90FE`;
  }

  hashtagsInput.reportValidity();
};

// Message validation
const setMessageValidationHandler = () => {
  textDescription.maxLength = MAX_MESSAGE_SYMBOLS;
};

// Submit form
const onMessageEscPress = (evt, messageElement) => {
  if (window.utils.isEsc(evt.key)) {
    evt.preventDefault();
    messageElement.style.visibility = `hidden`;
  }
};
const renderMessageHandler = (messageElement) => {
  const escHandlerFn = (evt) => onMessageEscPress(evt, messageElement);
  document.querySelector(`main`).appendChild(messageElement);
  document.addEventListener(`keydown`, escHandlerFn);
  messageElement.style.visibility = `visible`;
  messageElement.addEventListener(`click`, (evt) => {
    if (!evt.target.closest(`.success__inner`)) {
      messageElement.style.visibility = `hidden`;
    }
  });
  messageElement.querySelector(`button`).addEventListener(`click`, () => {
    messageElement.style.visibility = `hidden`;
    document.removeEventListener(`keydown`, escHandlerFn);
  });
};

const submitHandler = (evt) => {
  const onSuccess = () => {
    cancelUploadModal();
    renderMessageHandler(successMessage);
  };
  const onError = () => {
    cancelUploadModal();
    renderMessageHandler(errorMessage);
  };
  window.upload.setData(new FormData(imageUploadForm), onSuccess, onError);
  evt.preventDefault();
  window.upload.cleanFile();
};

// Init point
const setModalHandler = () => {
  uploadCancelButton.addEventListener(`click`, cancelUploadModal);
  uploadCancelButton.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      cancelUploadModal();
    }
  });
  scaleControlBigger.addEventListener(`click`, setBiggerValueHandler);
  scaleControlSmaller.addEventListener(`click`, setSmallerValueHandler);
  effectImages.addEventListener(`change`, changeImageEffectHandler);
  sliderEffectPin.addEventListener(`mousedown`, setLevelEffectSliderHandler);
  hashtagsInput.addEventListener(`input`, window.utils.debounce(setHashtagValidation));
  textDescription.addEventListener(`input`, setMessageValidationHandler);
  imageUploadForm.addEventListener(`submit`, submitHandler);

  // Reset all to defaults once app loaded
  resetToDefaults();
};

window.form = {
  setModalHandler,
  openUploadModal,
};
