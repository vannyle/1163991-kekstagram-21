'use strict';

(() => {
  // Constants
  const MIN_VALUE = 25;
  const STEP = 25;
  const MAX_VALUE = 100;
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 20;
  const HASHTAGS_COUNT = 5;
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
  const imageUploadControl = document.querySelector(`.img-upload__control`);
  const imageUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const uploadCancelButton = document.getElementById(`upload-cancel`);
  const uploadPreview = imageUploadOverlay.querySelector(`.img-upload__preview`);
  const scaleControlSmaller = imageUploadOverlay.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = imageUploadOverlay.querySelector(`.scale__control--bigger`);
  const scaleControlValue = imageUploadOverlay.querySelector(`.scale__control--value`);

  const effectLevel = imageUploadOverlay.querySelector(`.effect-level`);
  const effectImages = imageUploadOverlay.querySelector(`.effects`);
  const sliderEffectPin = imageUploadOverlay.querySelector(`.effect-level__pin`);
  const sliderEffectLine = imageUploadOverlay.querySelector(`.effect-level__line`);
  const sliderEffectDepth = imageUploadOverlay.querySelector(`.effect-level__depth`);

  const hashtagsInput = imageUploadOverlay.querySelector(`.text__hashtags`);

  // Open and close upload modal
  const onUploadEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      cancelUpload();
    }
  };
  const openUpload = () => {
    imageUploadOverlay.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, onUploadEscPress);
  };
  const cancelUpload = () => {
    imageUploadOverlay.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onUploadEscPress);
  };

  // Scale control
  let defaultValue = 50;
  uploadPreview.style.transform = `scale(${defaultValue / 100})`;
  const setSmallerValue = () => {
    if (defaultValue > MIN_VALUE) {
      defaultValue -= STEP;
      scaleControlValue.value = `${defaultValue}%`;
      uploadPreview.style.transform = `scale(${defaultValue / 100})`;
    }
  };
  const setBiggerValue = () => {
    if (defaultValue < MAX_VALUE) {
      defaultValue += STEP;
      scaleControlValue.value = `${defaultValue}%`;
      uploadPreview.style.transform = `scale(${defaultValue / 100})`;
    }
  };

  // Image effects
  effectLevel.style.visibility = `hidden`;
  let effect = null;
  const setEffectValue = (value) => {
    sliderEffectPin.style.left = `${value * 100}%`;
    sliderEffectDepth.style.width = `${value * 100}%`;
    const effectValue = effect.multiplier ? `(${effect.multiplier * value}${effect.units || ``})` : ``;
    uploadPreview.querySelector(`img`).style.filter = effect.prop + effectValue;
  };

  const setImageEffects = (e) => {
    const target = e.target;
    effect = EFFECTS[target.value];
    if (effect) {
      setEffectValue(1);
      if (effect.prop === `none`) {
        document.querySelector(`.effect-level`).style.visibility = `hidden`;
      } else {
        document.querySelector(`.effect-level`).style.visibility = `visible`;
      }
    }
  };

  // Level effect slider
  const setLevelEffectSlider = (evt) => {
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
    const arrayOfHashtags = hashtagsInput.value.split(` `);

    const pattern = /(?:\s|^)#[A-Za-z0-9\-\.\_]+(?:\s|$)/;
    arrayOfHashtags.forEach((hashtag) => {
      if (hashtag.length < MIN_NAME_LENGTH) {
        hashtagsInput.setCustomValidity(`Ещё ${(MIN_NAME_LENGTH - hashtag.length)} симв.`);
      } else if (hashtag.length > MAX_NAME_LENGTH) {
        hashtagsInput.setCustomValidity(`Удалите лишние ${(hashtag.length - MAX_NAME_LENGTH)} симв.`);
      } else if (!pattern.test(hashtagsInput.value)) {
        hashtagsInput.setCustomValidity(`Хэштеги начинаются с # не должны содержать символы и пробелы`);
      } else {
        hashtagsInput.setCustomValidity(``);
      }
      if (arrayOfHashtags.length > HASHTAGS_COUNT) {
        hashtagsInput.setCustomValidity(`Не больше пяти хэштегов`);
      }
    });
    hashtagsInput.reportValidity();
  };

  // Init point
  const setFormHandler = () => {
    imageUploadControl.addEventListener(`click`, openUpload);
    uploadCancelButton.addEventListener(`click`, cancelUpload);
    uploadCancelButton.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        cancelUpload();
      }
    });
    scaleControlBigger.addEventListener(`click`, setBiggerValue);
    scaleControlSmaller.addEventListener(`click`, setSmallerValue);
    effectImages.addEventListener(`change`, setImageEffects);
    sliderEffectPin.addEventListener(`mousedown`, setLevelEffectSlider);
    hashtagsInput.addEventListener(`input`, setHashtagValidation);
  };

  window.form = {
    setFormHandler,
  };
})();
